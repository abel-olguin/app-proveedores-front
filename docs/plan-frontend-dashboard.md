# Vatucasa: plan del frontend y dashboard

Estado: borrador técnico v0.3  
Recomendación principal: Angular 22+ con TypeScript, Signals como modelo principal de estado, Spartan UI, Tailwind y despliegue en Cloudflare Pages.

## 1. Decisión de frontend

Vatucasa es una aplicación operativa con sesión, roles, chat, agenda, administración, monetización, gamificación, permisos y flujos protegidos. El frontend del MVP se construirá como una aplicación Angular 22+.

Decisiones base:

- Angular 22+ como framework único de la app.
- Cloudflare Pages para despliegue del frontend.
- Spartan UI como base de componentes, con Tailwind y tokens propios.
- Signals como primera opción para estado local, derivado y formularios.
- RxJS al mínimo: solo en límites asíncronos donde sea realmente útil, como HTTP, streams, polling, SSE o interoperabilidad con librerías.
- Evitar Reactive Forms como patrón base; construir flujos con Signals y validación compartida.
- Mobile first, accesibilidad WCAG 2.2 AA, rutas de error e interceptores desde la base.
- Landing page en WordPress para SEO como último paso, separada de la app operativa.

## 2. Arquitectura frontend

```text
apps/web/src/app/
  core/
    auth/               # JWT, sesión, refresh, guards, permisos
    api/                # cliente Hono, errores, cache HTTP
    config/             # initializer, settings remotos/locales
    feature-flags/
    i18n/
    theme/
    telemetry/
    realtime/           # polling/SSE/realtime elegido
  shared/
    ui/                 # wrappers Spartan UI y componentes propios
    forms/              # controles basados en Signals
    validation/         # adaptadores Zod/contratos
    maps/
    pipes/
    directives/
  features/
    public-catalog/
    auth/
    onboarding/
    inbox/
    appointments/
    customer-profile/
    provider-dashboard/
    subscriptions/
    promotions/
    gamification/
    admin/
    legal/
    errors/
  layouts/
  app.routes.ts
```

Principios:

- standalone components;
- rutas lazy-loaded por feature y rol;
- guards y `ngx-permissions` para UX, con permisos reales validados por API;
- estado de servidor cerca de cada feature, con cache controlado;
- contratos compartidos con la API mediante OpenAPI/Hono/Zod sin importar código ejecutable del servidor;
- diseño con tokens: color, tipografía, espaciado, radio, sombras, capas y estados semánticos;
- no duplicar sesión, permisos ni feature flags en stores paralelos.

## 3. Librerías base

Base obligatoria o preferente:

- Angular 22+.
- Spartan UI y dependencias necesarias.
- Tailwind.
- ESLint.
- Jest.
- Prettier.
- `@auth0/angular-jwt`.
- `ngx-translate` para multilanguage.
- `ngx-onboarding` para onboarding guiado.
- `ngx-permissions`.
- `ngx-sooner`.
- `ngx-mask`.
- `ngx-clipboard`.
- `ngx-markdown`.
- `ngx-quill` / Quill cuando se requiera editor enriquecido.
- `chart.js`.
- `angular-calendar`.
- `@tanstack/angular-table`.
- `@ngneat/cashew`.
- `@ng-select/ng-select`.
- `@iplab/ngx-color-picker`.
- `@danielmoncada/angular-datetime-picker`.

Estas librerías no eliminan la responsabilidad de mantener componentes accesibles, mobile first y coherentes con el sistema visual. Cada dependencia debe envolverse cuando convenga para no filtrar detalles de implementación por toda la app.

## 4. Mapa de rutas

Públicas:

```text
/
/buscar?categoria=&servicio=&lat=&lng=&radio=
/categoria/:slug
/proveedor/:slug
/cliente/:id
/acceso
/registro
/privacidad
/terminos
/cookies
/legal/:slug
/error
/error/404
/error/500
```

Autenticadas:

```text
/app                         # inicio según rol/permisos
/app/mensajes
/app/mensajes/:conversationId
/app/citas
/app/citas/:appointmentId
/app/perfil
/app/cliente/perfil
/app/suscripcion
/app/gamificacion
/app/proveedor/perfil
/app/proveedor/servicios
/app/proveedor/disponibilidad
/app/proveedor/ubicacion
/app/proveedor/galeria
/app/proveedor/promociones
/app/proveedor/suscripcion
/app/admin/proveedores
/app/admin/catalogo
/app/admin/roles
/app/admin/permisos
/app/admin/suscripciones
/app/admin/anuncios
/app/admin/crawlers
/app/admin/reportes
/app/admin/feature-flags
```

No construir aplicaciones separadas por rol. Compartir shell, navegación, cuenta, chat y citas; activar menús y capacidades por permisos.

## 5. Autenticación, sesión y configuración

La comunicación de autenticación será con JWT.

Flujo:

1. Registro/login contra la API Hono.
2. La API entrega access token de vida corta y refresh token registrado.
3. El frontend envía `Authorization: Bearer <token>` hacia Hono.
4. `@auth0/angular-jwt` ayuda a leer expiración y estado del token.
5. Un interceptor agrega token, maneja `401`, intenta refresh cuando corresponde y redirige si la sesión ya no es válida.
6. El refresh se intenta al cargar/refrescar la app y de forma periódica. La renovación normal ocurre cada hora, con máximo de 24 horas por ciclo; si pasa 1 mes sin actividad, la sesión se pierde.
7. Logout limpia tokens, caches, borradores sensibles y revoca sesión en backend.

`APP_INITIALIZER` debe cargar configuración inicial desde backend: idioma, tema, feature flags, límites públicos, versiones legales vigentes y settings guardados localmente. Usar almacenamiento local solo para preferencias no sensibles y caches seguros; nunca guardar secretos.

## 6. Roles y permisos

Roles base del MVP:

- `customer`
- `provider`
- `admin`
- `staff`

Además habrá roles personalizados basados en permisos. `staff` será la base del equipo de soporte, pero la administración debe permitir crear variantes sin cambios de código.

En frontend:

- `ngx-permissions` gobierna visibilidad y navegación;
- guards protegen rutas por sesión/permisos;
- toda acción sensible se valida de nuevo en backend;
- el módulo admin incluye control de roles y permisos desde el MVP.

## 7. Experiencias prioritarias

### Cliente

1. Buscar sin cuenta.
2. Abrir perfil de proveedor con servicios, categoría principal, zona, galería, promociones y reseñas.
3. Completar perfil de cliente para generar confianza.
4. Al pulsar “Conversar”, autenticarse si hace falta y regresar al contexto.
5. Enviar mensajes sin poder compartir teléfono/correo antes de cita confirmada.
6. Usar widgets dentro del chat para proponer y gestionar cita.
7. Consultar/gestionar cita.
8. Recibir descuentos/promociones si aplica.
9. Reseñar al completarse.
10. Ganar puntos y canjear beneficios internos.

### Proveedor

1. Registro y selección de rol.
2. Onboarding con `ngx-onboarding`.
3. Checklist de perfil publicable.
4. Definir categoría principal, servicios, ubicación/radio, disponibilidad y galería.
5. Atender bandeja y widgets de cita.
6. Ver agenda semanal/lista en móvil.
7. Completar/cancelar cita.
8. Crear promociones y descuentos.
9. Ver plan, cuota de trabajos, anuncios y beneficios.
10. Ganar puntos y canjear beneficios como días de publicidad.

### Administración y staff

1. Cola de proveedores pendientes y candidatos de crawler.
2. Detalle y decisión con motivo.
3. CRUD de categorías/servicios.
4. Control de roles y permisos.
5. Gestión de planes, feature flags, anuncios, promociones y reportes.
6. Suspensión y auditoría.
7. Soporte regular/prioritario según plan.

## 8. UI y sistema de diseño

Crear antes de pantallas completas:

- tokens de color, tipografía, espaciado, radio, sombra y capas;
- tema claro y oscuro;
- estados semánticos: información, éxito, advertencia, error y neutral;
- componentes: botón, campo, selector, autocomplete, slider, tarjeta, badge, avatar, diálogo, sheet, toast, skeleton, empty state, paginación y confirmación destructiva;
- patrones: encabezado de página, filtro responsive, lista/detalle, stepper, wizard, panel lateral, tabla administrativa y chat widget.

Base:

- Tailwind + CSS variables;
- Spartan UI para primitivas accesibles;
- Angular CDK para overlay, focus management, a11y y comportamientos complejos;
- `@tanstack/angular-table` para tablas de administración cuando el requerimiento supere tablas simples;
- `angular-calendar` para vistas de agenda donde aporte valor;
- `ngx-sooner` para toasts;
- `ng-select` para selects ricos;
- `ngx-mask` para entradas con formato;
- `@iplab/ngx-color-picker` solo en administración/configuración visual donde haga falta.

No usar Angular Material como base visual si el objetivo es un dashboard limpio tipo shadcn/Spartan.

## 9. Estado, datos y cache

Separar:

1. **Estado de URL:** búsqueda, filtros, orden y página. Debe sobrevivir recarga y ser compartible.
2. **Estado de servidor:** perfiles, conversaciones, mensajes, citas, planes, promociones y permisos.
3. **Estado efímero:** diálogos, borradores, selección local y widgets abiertos.
4. **Preferencias locales:** tema, idioma y settings no sensibles.

Reglas:

- Signals primero para estado local y derivado;
- RxJS solo en límites donde Angular/HTTP/realtime lo hagan natural;
- `@ngneat/cashew` para cache HTTP controlado en lecturas públicas o repetidas;
- invalidación explícita tras mutaciones;
- no aplicar optimismo a transiciones críticas de cita sin rollback visible;
- mensajes pueden mostrarse como “enviando” con ID cliente y reconciliarse;
- cada pantalla tiene loading, vacío, error, sin permiso y offline/reconectando;
- cancelar solicitudes obsoletas de búsqueda.

## 10. Chat, widgets y agenda

Chat:

- layout lista/detalle en escritorio y rutas separadas en móvil;
- scroll anclado con paginación por cursor;
- conservar borrador local por conversación;
- reconectar y recuperar mensajes desde API;
- distinguir enviado, pendiente y fallido;
- reportar y bloquear desde menú;
- bloquear teléfonos/correos antes de cita confirmada, incluso intentos con espacios, puntos, separadores, emojis o texto ofuscado;
- no renderizar HTML de mensajes.

Widgets de cita:

- crear propuesta de cita dentro del chat;
- aceptar, rechazar, reprogramar, cancelar y ver historial;
- mostrar estado humano: “Propuesta”, “Confirmada”, “Reprogramación pendiente”, etc.;
- no abandonar la conversación para agendar;
- el backend siempre confirma disponibilidad y transición.

Seguridad de datos:

- antes de cita confirmada no se comparte teléfono, correo ni ubicación exacta;
- una vez concretada la agenda, ambas partes aceptan compartir ubicación y teléfono para esa cita.

## 11. Ubicación y cobertura

Proveedor:

1. `/app/proveedor/ubicacion` muestra mapa con pin arrastrable.
2. El proveedor puede usar ubicación del navegador como punto inicial, pero debe poder mover el pin.
3. El radio se edita con slider/input.
4. Default: 10 km. Mínimo: 1 km. Máximo inicial: 50 km para servicios presenciales.
5. Radios mayores requieren servicio remoto o revisión administrativa.
6. Mostrar texto aproximado, no dirección exacta.

Cliente:

1. La búsqueda pide ubicación del navegador o permite mover un pin manual.
2. La ubicación se usa para ordenar/filtrar proveedores por distancia.
3. No exponer ubicación exacta al proveedor antes de cita confirmada.

## 12. Formularios y validación

Evitar Reactive Forms como base. Usar controles y flujos basados en Signals.

Validación:

- Zod/contratos compartidos cuando el schema pertenece al contrato API;
- validación cliente para UX, nunca como sustituto de backend;
- errores tras blur o submit, salvo validaciones inmediatas útiles;
- mensajes específicos, no “valor inválido”;
- foco al primer error y resumen accesible;
- prevenir doble envío, con idempotencia real en API;
- guardar borradores de onboarding o perfil cuando el flujo sea largo;
- advertir antes de perder cambios.

Errores API:

- `400`: request mal formado.
- `401`: sesión expirada; intentar refresh o redirigir conservando destino.
- `403`: sin permiso.
- `404`: recurso no existe o no visible.
- `409`: conflicto recuperable, por ejemplo horario ocupado.
- `422`: errores de validación por campo.
- `429`: rate limit.
- `5xx`: error temporal con reintento manual.

## 13. Monetización, promociones y gamificación

Planes de cliente:

- Cliente sin anuncios: $49. Elimina publicidad, muestra badge de verificado y permite recibir promociones/descuentos.
- Cliente premium: $99. Incluye lo anterior y soporte prioritario.

Planes de proveedor:

- $99: límite mensual de trabajos, soporte regular.
- $249: límite mensual de trabajos, soporte regular.
- $499: límite mensual de trabajos, soporte prioritario.
- $999: sin límite mensual de trabajos, soporte prioritario.

Proveedor Plus también da acceso a promociones/descuentos, retiro de publicidad en sus plataformas internas, más facilidades operativas y anuncios adicionales con costo separado.

La gamificación será parte del MVP y gratuita. Clientes y proveedores ganan puntos por logros/retos y canjean beneficios internos, como un mes premium o días de publicidad gratis.

Todos los features comerciales se controlan por feature flags. Al inicio puede estar todo gratis para fidelización; pagos, límites, anuncios y beneficios se activan gradualmente. Stripe se usará para suscripciones con tarjeta y cobro automatizado.

## 14. Catálogo inicial y crawlers

El catálogo inicial se generará con crawlers porque sin datos iniciales la experiencia no tendrá suficiente oferta.

Frontend debe incluir:

- vista admin de fuentes crawler;
- lista de candidatos detectados;
- deduplicación/revisión visual;
- edición antes de publicar;
- estado de consentimiento/contacto;
- auditoría de decisión.

Los candidatos no deben aparecer como proveedores activos sin revisión y política definida.

## 15. Legal, i18n y temas

Políticas, privacidad, cookies y términos son parte obligatoria del MVP.

Requisitos:

- rutas públicas para documentos legales;
- aceptación obligatoria en registro y cuando cambie versión relevante;
- `ngx-translate` para multilanguage;
- selector de idioma;
- tema claro/oscuro;
- respetar preferencia del sistema cuando el usuario no haya elegido tema;
- guardar idioma/tema localmente y sincronizar preferencia con backend cuando haya sesión.

## 16. Rendimiento, SEO y WordPress

MVP app:

- Angular desplegado en Cloudflare Pages;
- lazy loading por ruta;
- presupuesto de bundles en CI;
- imágenes responsivas, tamaños reservados y lazy loading;
- metadatos básicos en rutas públicas;
- sitemap desde proveedores publicados si aplica.

SEO ampliado:

- landing page en WordPress con plantilla básica;
- será el último paso, después de tener app, catálogo y operación mínima;
- WordPress se usa para SEO y marketing, no para reemplazar la app Angular.

## 17. Accesibilidad y responsive

Objetivo: WCAG 2.2 AA.

- mobile first;
- navegación completa por teclado;
- foco visible y restauración de foco en diálogos/rutas;
- contraste verificado en claro y oscuro;
- áreas táctiles adecuadas;
- chat y calendario utilizables con zoom 200%;
- `aria-live` solo para eventos importantes;
- labels reales, descripciones y errores asociados;
- pruebas automatizadas y revisión manual con teclado/VoiceOver.

## 18. Seguridad del frontend

- no renderizar HTML de mensajes;
- CSP y headers de seguridad en Cloudflare Pages/Workers;
- evitar tokens/datos personales en analytics, logs y errores;
- interceptor para Authorization, refresh y errores;
- rutas de error dedicadas;
- confirmación y motivo para acciones administrativas;
- ocultar no equivale a autorizar: backend/permisos validan todo;
- limpiar caches/borradores al cerrar sesión;
- nunca guardar secretos en localStorage;
- reducir exposición de teléfono y ubicación al momento estrictamente necesario;
- bloquear visualmente intentos de enviar teléfono/correo, pero tratar el backend como autoridad.

## 19. Pruebas

- Jest para unitarias.
- Pruebas de componentes con lógica, mapeadores y stores basados en Signals.
- Integración: servicios HTTP, guards, interceptores, permisos, forms con Signals, mapa y realtime simulado.
- E2E con Playwright: cliente, proveedor, staff y admin en contextos separados.
- Visuales: estados críticos responsive.
- Accesibilidad automatizada y manual.
- Contrato: fixtures generados desde OpenAPI/tipos Hono.
- Resiliencia: token expirado, refresh fallido, sesión revocada, 409 por slot ocupado, offline y reconexión.

Flujos E2E obligatorios:

1. búsqueda anónima → login → conversación conservando destino;
2. registro → aceptación legal → sesión JWT;
3. proveedor completa perfil con categoría principal → publicación;
4. proveedor coloca pin, cambia radio y aparece en búsqueda por distancia;
5. cliente completa perfil y badge visible cuando aplica;
6. chat bloquea teléfono/correo antes de cita confirmada;
7. cliente propone cita con widget → proveedor confirma → ambos ven cita;
8. conflicto de horario muestra recuperación útil;
9. cita completada → una sola reseña;
10. usuario A no abre conversación/cita de usuario B;
11. admin/staff gestiona roles, permisos y proveedores según permisos;
12. admin revisa candidato crawler y lo publica;
13. proveedor crea promoción;
14. gamificación otorga puntos y canjea beneficio.

## 20. Secuencia de implementación para el agente

### Etapa 0 — fundamentos

- Angular 22+, Tailwind, Spartan UI, ESLint, Jest y Prettier.
- Tokens, tema claro/oscuro y componentes base.
- Routing, layouts, rutas de error, interceptores y cliente API.
- `APP_INITIALIZER` para config, feature flags, idioma, tema y legal.
- `ngx-translate`, `ngx-permissions`, `@auth0/angular-jwt`.
- CI con lint, test y presupuesto.

### Etapa 1 — auth, legal y catálogo

- registro/login/JWT/refresh/logout;
- aceptación de términos;
- búsqueda/filtros en URL;
- tarjetas, perfil de proveedor y perfil de cliente;
- estados vacíos/error y analítica del embudo.

### Etapa 2 — proveedor y cliente

- onboarding con `ngx-onboarding`;
- perfil cliente;
- perfil proveedor con categoría principal;
- servicios, pin/radio de cobertura, descripción y galería;
- disponibilidad simple;
- estado de publicación/revisión.

### Etapa 3 — mensajes y widgets

- inbox responsive;
- historial paginado, envío y reconexión;
- bloqueo de teléfono/correo;
- widgets de cita;
- no leídos, borradores, bloqueo/reporte básico.

### Etapa 4 — citas, reseñas y promociones

- vistas de agenda/lista;
- aceptar, rechazar, reprogramar y cancelar;
- historial de estado y recordatorios visibles;
- reseña tras cita completada;
- promociones/descuentos de proveedor.

### Etapa 5 — administración

- revisión de proveedores y catálogo;
- roles y permisos;
- planes, feature flags, anuncios y reportes;
- crawlers y candidatos;
- suspensión y auditoría.

### Etapa 6 — monetización, gamificación y hardening

- pantallas de suscripción Stripe;
- cuotas de trabajos y beneficios por plan;
- gamificación, puntos, logros y canjes;
- accesibilidad, rendimiento, seguridad y E2E;
- telemetría y correcciones del piloto.

### Etapa 7 — landing WordPress

- plantilla básica;
- contenido SEO inicial;
- enlaces hacia app Angular;
- publicación al final, cuando catálogo y operación mínima existan.

## 21. Definición de terminado

Una feature no está terminada solo por verse bien. Debe tener:

- móvil, tablet y escritorio donde aplique;
- loading, vacío, error, sin permiso y éxito;
- teclado, foco, labels y contraste;
- soporte claro/oscuro;
- textos con `ngx-translate`;
- manejo de `401`, `403`, `404`, `409`, `422`, `429` y `5xx` relevantes;
- evento analítico sin PII;
- prueba del flujo feliz y al menos un fallo importante;
- texto revisado en español;
- contrato API y permisos verificados.

## 22. Decisiones para la siguiente revisión

1. ¿Una cuenta puede alternar rol cliente/proveedor en la misma sesión?
2. ¿Qué proveedor de mapas se usará y cuánto costo aceptamos antes de cambiar?
3. ¿Qué datos exactos del perfil de cliente serán públicos para proveedores?
4. ¿Qué límites de trabajos tendrán los planes de 99, 249 y 499?
5. ¿Qué promociones pueden publicarse sin revisión manual?
6. ¿Qué reglas exactas bloquearán teléfono/correo ofuscado en chat?
7. ¿Qué fuentes crawler están permitidas?
8. ¿Qué beneficios de gamificación se activan desde el piloto?
9. ¿Qué feature flags arrancan apagados?
10. ¿Qué contenido tendrá la landing WordPress final?

## 23. Recomendación final

Comenzar con Angular 22+, TypeScript, Spartan UI, Tailwind, Signals como patrón principal, JWT, feature flags, accesibilidad mobile first y Cloudflare Pages. El MVP debe incluir chat con widgets de cita, perfiles de cliente/proveedor, roles personalizados, administración de permisos, sesiones registradas, promociones, gamificación básica, catálogo crawler y pagos Stripe preparados para activación gradual.
