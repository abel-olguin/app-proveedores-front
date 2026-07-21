# Vatucasa: plan del frontend y dashboard

Estado: borrador técnico v0.2  
Recomendación principal: Angular + TypeScript para toda la aplicación del MVP, desplegado en Cloudflare Pages. Usar un sistema visual tipo shadcn mediante `spartan/ui` o componentes propios sobre Angular CDK/Tailwind. Astro solo si más adelante se separa un sitio editorial/marketing.

## 1. Resultado de la evaluación

Vatucasa no es principalmente un sitio de contenido. Es una aplicación con:

- sesión y cuatro experiencias por rol;
- formularios largos de perfil y disponibilidad;
- bandeja y chat en tiempo real;
- calendario y conflictos de agenda;
- tablas, filtros y moderación administrativa;
- estados compartidos, permisos y navegación protegida.

Por ello, Angular encaja mejor como framework único. Su plataforma incluye enrutamiento, guards, formularios, inyección de dependencias, SSR/SSG y reactividad con Signals ([visión oficial](https://angular.dev/overview), [Signals](https://angular.dev/guide/signals)). Usar componentes standalone y rutas lazy-loaded reduce parte del peso histórico de Angular ([standalone](https://angular.dev/reference/migrations/standalone)).

Astro es maduro y técnicamente puede renderizar rutas dinámicas, cookies y SSR mediante adaptadores ([renderizado bajo demanda](https://docs.astro.build/en/guides/on-demand-rendering/)). Su arquitectura de islas sobresale cuando la mayor parte de una página es HTML y solo algunas zonas son interactivas ([islas](https://docs.astro.build/es/concepts/islands/)). En Vatucasa, chat, agenda y dashboard serían islas grandes y conectadas. Combinar Astro con Alpine.js añadiría coordinación manual de estado, validación, routing y pruebas justo en el núcleo del producto.

### Decisión

Usar Angular como SPA inicialmente, con páginas públicas accesibles y SEO básico. Evaluar SSR solo para catálogo/perfiles cuando exista contenido real que posicionar. No crear dos frontends en el MVP.

shadcn/ui como tal está orientado al ecosistema React y distribuye componentes copy-paste en TypeScript sobre primitivas React/Radix. En Angular, la opción coherente es usar `spartan/ui`, que sigue una filosofía similar: primitivas accesibles mantenidas y estilos copiables/editables inspirados en shadcn ([spartan/ui](https://www.spartan.ng/documentation/introduction)). Si se exige shadcn literal, la decisión técnica cambia a React; mientras Angular siga siendo la base, no mezclar componentes React dentro del dashboard.

Astro podría añadirse después para `www.vatucasa...` (landing, blog, guías por ciudad y categoría), mientras Angular vive en `app.vatucasa...`. Esto solo se justifica si el canal orgánico exige un equipo/ciclo editorial separado.

## 2. Comparación aplicada

| Criterio | Angular | Astro + Alpine.js | Astro + framework UI |
|---|---|---|---|
| Dashboard complejo | Muy adecuado | Requiere mucha infraestructura propia | Adecuado, pero duplica capas |
| Chat/Realtime | Estado y servicios claros | Posible, más manual | Posible dentro de una isla grande |
| Formularios/validación | Solución madura | Hay que elegir/integrar | Depende del framework embebido |
| Routing/guards | Integrado | Manual o librerías | Dos modelos mentales |
| Calendario/tablas | Ecosistema amplio | Integración artesanal | Correcto dentro de React/Vue/Svelte |
| SEO de catálogo | SSR/SSG disponible | Excelente | Excelente |
| JS inicial | Mayor, optimizable | Bajo | Bajo en páginas públicas |
| Complejidad del MVP | Una arquitectura | Menos al inicio, más al crecer | La mayor de las tres |

Alpine.js es suficientemente bueno para menús, diálogos, filtros sencillos y mejoras progresivas. No lo recomiendo como base de una aplicación operativa con estado distribuido y tiempo real.

## 3. Arquitectura frontend

```text
apps/web/src/app/
  core/
    auth/               # sesión, interceptor y guards
    api/                # cliente Hono y manejo de errores
    realtime/           # polling/SSE/realtime elegido y reconexión
    telemetry/
    cloudflare/         # env público, analytics/web vitals si aplica
  shared/
    ui/                 # componentes accesibles
    forms/
    validation/         # adaptadores Zod -> formularios
    maps/               # mapa, pin y radio de servicio
    pipes/
  features/
    public-catalog/
    onboarding/
    inbox/
    appointments/
    provider-dashboard/
    customer-dashboard/
    admin/
  layouts/
  app.routes.ts
```

Principios:

- standalone components;
- lazy loading por feature/rol;
- Signals para estado local y derivado;
- RxJS en límites asíncronos, streams y Realtime, sin convertir cada valor en observable;
- estado de servidor cerca de cada feature; no introducir NgRx al inicio;
- Hono RPC o cliente generado para tipos, sin importar código de servidor ejecutable;
- design system pequeño basado en tokens tipo shadcn: Tailwind, CSS variables, radios moderados, estados claros y componentes propios del repo.

## 4. Mapa de rutas

Públicas:

```text
/
/buscar?categoria=&servicio=&lat=&lng=&radio=
/categoria/:slug
/proveedor/:slug
/acceso
/registro
/privacidad
/terminos
```

Autenticadas:

```text
/app                         # inicio según rol
/app/mensajes
/app/mensajes/:conversationId
/app/citas
/app/citas/:appointmentId
/app/perfil
/app/proveedor/perfil
/app/proveedor/disponibilidad
/app/proveedor/ubicacion
/app/proveedor/galeria
/app/admin/proveedores
/app/admin/catalogo
/app/admin/reportes
```

No construir cuatro aplicaciones distintas. Compartir shell, navegación, cuenta, chat y citas; activar menús y capacidades por rol. Los guards mejoran UX, pero la API y los permisos del backend siguen siendo la autoridad.

## 5. Experiencias prioritarias

### Cliente

1. Buscar sin cuenta.
2. Abrir perfil con servicios, zona, galería y reseñas.
3. Al pulsar “Conversar”, autenticar si hace falta y regresar al contexto.
4. Enviar mensaje.
5. Proponer horario dentro del chat.
6. Consultar/gestionar cita.
7. Reseñar al completarse.

### Proveedor

1. Registro y selección de rol.
2. Checklist de perfil publicable.
3. Definir servicios, ubicación/radio de cobertura y disponibilidad.
4. Enviar a revisión/publicar según política.
5. Atender bandeja y propuestas.
6. Ver agenda semanal/lista en móvil.
7. Completar/cancelar cita.

### Administración inicial

1. Cola de proveedores pendientes.
2. Detalle y decisión con motivo.
3. CRUD de categorías/servicios.
4. Suspensión y auditoría.
5. Reportes básicos.

No incluir constructor de anuncios, facturación, gráficas avanzadas ni impersonación en la primera versión.

## 6. UI y sistema de diseño

Crear antes de las pantallas:

- tokens: color, tipografía, espaciado, radio, sombra y capas;
- estados semánticos: información, éxito, advertencia, error y neutral;
- componentes: botón, campo, selector, autocomplete, slider, tarjeta, badge, avatar, diálogo, sheet, toast, skeleton, empty state, paginación y confirmación destructiva;
- patrones: encabezado de página, filtro responsive, lista/detalle, stepper y panel lateral.

Base recomendada:

- Tailwind + CSS variables con tokens tipo shadcn;
- `spartan/ui` para componentes Angular accesibles y estilos copiables/editables;
- Angular CDK para overlay, focus management, a11y y comportamientos donde haga falta;
- iconos con lucide-angular;
- tablas propias al inicio; si crecen, evaluar TanStack Table compatible con Angular o una integración específica.

No usar Angular Material como base visual si el objetivo es un dashboard limpio tipo shadcn. Puede usarse CDK sin adoptar Material UI. Evitar librerías de dashboard que impongan layout, estilos y dependencias antes de conocer el producto.

## 7. Estado y datos

Separar tres tipos:

1. **Estado de URL:** búsqueda, filtros, orden y página. Debe ser compartible y sobrevivir recarga.
2. **Estado de servidor:** perfiles, conversaciones, mensajes y citas. Cache corto, invalidación explícita y recuperación ante error.
3. **Estado efímero:** diálogos, borradores y selección local. Signals del componente/feature.

Reglas prácticas:

- no duplicar la sesión en múltiples stores;
- no aplicar optimismo a transiciones críticas de cita sin rollback visible;
- mensajes pueden mostrarse como “enviando” con ID cliente y reconciliarse con respuesta;
- cada pantalla tiene loading, vacío, error, sin permiso y offline/reconectando;
- usar `track`/identidades estables en listas;
- cancelar solicitudes obsoletas de búsqueda.

## 8. Integración con Auth, Hono y Cloudflare

Responsabilidades del navegador:

- proveedor de Auth seleccionado para login, refresh y OAuth;
- guardar sesión según la integración oficial seleccionada;
- token Bearer hacia Hono;
- suscripción al mecanismo realtime elegido: polling, SSE desde Workers o proveedor externo;
- subida directa a R2 mediante URL firmada o endpoint autorizado por API.

Responsabilidades de Hono:

- validar entradas y permisos;
- aplicar reglas/transacciones;
- crear mensajes, citas, reseñas y decisiones administrativas;
- generar URLs firmadas o validar claves de R2;
- publicar trabajos en Cloudflare Queues cuando una acción requiera procesamiento asíncrono;
- exponer contratos estables y errores traducibles.

Cloudflare Pages despliega el frontend y Workers ejecuta la API. R2 guarda objetos; Queues procesa trabajos asíncronos; Hyperdrive conecta la API con PostgreSQL. El frontend nunca conoce credenciales de Hyperdrive, R2, Queues ni secretos JWT. Comprimir imágenes en cliente para UX, pero validar de nuevo tipo/tamaño en servidor.

## 9. Ubicación y cobertura

El MVP usa pin en mapa + radio de servicio, alineado con la API.

Proveedor:

1. La pantalla `/app/proveedor/ubicacion` muestra un mapa con pin arrastrable.
2. El proveedor puede usar ubicación del navegador como punto inicial, pero debe poder mover el pin.
3. El radio se edita con slider/input numérico.
4. Default: 10 km. Mínimo: 1 km. Máximo inicial: 50 km para servicios presenciales.
5. Radios mayores requieren `offers_remote_service` o revisión administrativa.
6. Mostrar `service_location_label` como texto aproximado, no dirección exacta.

Cliente:

1. La búsqueda pide ubicación del navegador o permite mover un pin manual.
2. La ubicación del cliente se usa para ordenar/filtrar proveedores por distancia.
3. No exponer ubicación exacta del cliente al proveedor antes de que el flujo de cita lo requiera.

UX:

- mapa usable en móvil;
- fallback si el usuario niega geolocalización;
- texto claro sobre privacidad;
- skeleton/loading mientras carga el mapa;
- error recuperable si falla el proveedor de mapas;
- no bloquear búsqueda anónima si no hay ubicación: permitir búsqueda general y pedir ubicación al filtrar por cercanía.

## 10. Chat y agenda en la interfaz

Chat:

- layout lista/detalle en escritorio y rutas separadas en móvil;
- scroll inverso o anclado con paginación por cursor;
- conservar borrador local por conversación;
- reconectar y recuperar mensajes desde API;
- distinguir enviado, pendiente y fallido;
- botón de agendar abre panel contextual, no abandona la conversación;
- bloquear spam y permitir reportar desde el menú.

Agenda:

- comenzar con lista diaria/semanal responsive; un calendario mensual vistoso no siempre es útil en móvil;
- mostrar zona horaria y duración claramente;
- servidor confirma disponibilidad; la UI nunca garantiza un slot solo porque lo mostró;
- transición y motivo se presentan como historial;
- usar lenguaje humano: “Propuesta”, “Confirmada”, “Reprogramación pendiente”, etc.

Para un calendario avanzado, evaluar librerías cuando estén definidos drag-and-drop, recurrencia y vistas requeridas. En MVP, controles propios de fecha/hora y lista reducen peso y errores.

## 11. Formularios y validación

Usar Reactive Forms tipados para onboarding, perfil, ubicación/radio, disponibilidad y administración. Para formularios pequeños, Signals/local state es suficiente, pero no mezclar enfoques dentro de un mismo flujo.

Zod es la fuente de validación compartida con backend cuando el schema pertenece al contrato. El frontend puede adaptar schemas Zod a formularios, pero no debe asumir que validación cliente sustituye validación servidor.

Convenciones:

- validación inmediata solo cuando ayuda; errores tras blur o submit;
- mensajes específicos, no “valor inválido”;
- usar los mismos límites que API: longitudes, enums, UUIDs, rangos de fechas, `service_radius_km`, MIME/tamaño de imágenes;
- guardar borrador de onboarding si es largo;
- advertir antes de perder cambios;
- errores del servidor se mapean a campo o banner;
- prevenir doble envío, pero la API mantiene idempotencia;
- accesibilidad: label real, descripción, foco al primer error y resumen.

Errores API:

- `400`: request mal formado, mostrar error general;
- `401`: sesión expirada, redirigir conservando destino;
- `403`: sin permiso, mostrar estado de acceso denegado;
- `404`: recurso no existe o no visible;
- `409`: conflicto recuperable, por ejemplo horario ocupado;
- `422`: errores de validación por campo;
- `429`: rate limit, pedir esperar;
- `5xx`: error temporal con reintento manual.

## 12. Rendimiento, SEO y renderizado

MVP recomendado:

- Angular SPA desplegada en Cloudflare Pages;
- lazy loading por ruta;
- presupuesto de bundles en CI;
- imágenes responsivas, tamaños reservados y lazy loading;
- `title`, description, canonical, Open Graph y JSON-LD en perfiles públicos;
- sitemap generado desde proveedores publicados.

Riesgo: una SPA puede ser menos consistente para indexación y previews sociales. Antes de añadir SSR, medir si adquisición orgánica es canal real. Si lo es, activar SSR/SSG de Angular para catálogo/perfiles o separar marketing en Astro. Angular declara soporte integrado para SSR y SSG ([documentación general](https://angular.dev/overview)); Astro permite mezclar rutas estáticas y bajo demanda ([documentación](https://docs.astro.build/en/guides/on-demand-rendering/)).

No adoptar Astro únicamente para decir que hay SEO. El contenido, metadatos, URLs estables, rendimiento y enlaces internos son el trabajo principal.

## 13. Accesibilidad y responsive

Objetivo: WCAG 2.2 AA.

- navegación completa por teclado;
- foco visible y restauración de foco en diálogos/rutas;
- contraste verificado;
- áreas táctiles adecuadas;
- anuncios de mensajes nuevos sin saturar lectores de pantalla;
- chat y calendario utilizables con zoom 200%;
- `aria-live` reservado para eventos importantes;
- pruebas con axe más revisión manual con teclado/VoiceOver;
- móvil primero en búsqueda, chat y agenda.

## 14. Seguridad del frontend

- no renderizar HTML de mensajes; texto por defecto;
- CSP y headers de seguridad en Cloudflare Pages/Workers;
- evitar tokens/datos personales en analytics, logs y errores;
- URLs de retorno OAuth en allowlist;
- confirmación y motivo para acciones administrativas;
- ocultar no equivale a autorizar: backend/permisos validan todo;
- limpiar cachés/borradores al cerrar sesión;
- reducir exposición de teléfono y domicilio al momento estrictamente necesario.

## 15. Pruebas

- unitarias: componentes con lógica, mapeadores y stores de feature;
- integración: servicios HTTP, guards, formularios, mapa y realtime simulado;
- E2E con Playwright: cliente y proveedor en contextos separados;
- visuales: estados críticos responsive, no todas las páginas;
- accesibilidad automatizada y manual;
- contrato: fixtures generados desde OpenAPI/tipos Hono;
- resiliencia: token expirado, 409 por slot ocupado, offline y reconexión.

Flujos E2E obligatorios:

1. búsqueda anónima → login → conversación conservando destino;
2. proveedor completa perfil → publicación;
3. proveedor coloca pin, cambia radio y aparece en búsqueda por distancia;
4. cliente propone → proveedor confirma → ambos ven cita;
5. conflicto de horario muestra recuperación útil;
6. cita completada → una sola reseña;
7. usuario A no abre conversación/cita de usuario B;
8. admin suspende proveedor y desaparece del catálogo.

## 16. Secuencia de implementación para el agente

Este plan no incluye tiempos. Es una lista ordenada para que una IA/agente implemente el frontend sin adelantar features fuera del MVP.

### Etapa 0 — fundamentos

- confirmar Angular y estrategia SPA/SSR diferido;
- wireframes de cinco flujos críticos;
- tokens y componentes base tipo shadcn con Tailwind/spartan;
- routing, layouts, Auth y cliente API;
- CI con lint, test y presupuesto.

### Etapa 1 — catálogo y acceso

- home/búsqueda/filtros en URL;
- tarjetas y perfil público;
- login/registro/OAuth y retorno al flujo;
- estados vacíos/error y analítica del embudo.

### Etapa 2 — proveedor

- onboarding con checklist;
- servicios, pin/radio de cobertura, descripción y galería;
- disponibilidad simple;
- estado de publicación/revisión.

### Etapa 3 — mensajes

- inbox responsive;
- historial paginado, envío y reconexión;
- no leídos, borradores, bloqueo/reporte básico;
- panel para propuesta de cita.

### Etapa 4 — citas y reseñas

- vistas de agenda/lista;
- aceptar, rechazar, reprogramar y cancelar;
- historial de estado y recordatorios visibles;
- reseña tras cita completada.

### Etapa 5 — administración y hardening

- revisión de proveedores y catálogo;
- suspensión/reportes mínimos;
- accesibilidad, rendimiento, seguridad y E2E;
- telemetría y correcciones del piloto.

## 17. Definición de terminado

Una feature no está terminada solo por verse bien. Debe tener:

- móvil, tablet y escritorio donde aplique;
- loading, vacío, error, sin permiso y éxito;
- teclado, foco, labels y contraste;
- manejo de 401, 403, 404, 409, 422, 429 y 5xx relevantes;
- evento analítico sin PII;
- prueba del flujo feliz y al menos un fallo importante;
- texto revisado en español;
- contrato API y permisos verificados.

## 18. Decisiones para la siguiente revisión

1. ¿Angular es una tecnología conocida por el equipo o implica curva completa?
2. ¿El catálogo debe posicionarse en Google desde el piloto?
3. ¿Una cuenta puede alternar rol cliente/proveedor en la misma sesión?
4. ¿Qué dispositivo usa principalmente cada rol?
5. ¿Qué proveedor de mapa se usará y cuánto costo aceptamos antes de cambiar?
6. ¿Se permite compartir teléfono/dirección dentro del chat?
7. ¿Qué estados de cita aportan valor real en piloto?
8. ¿La administración necesita funcionar perfectamente en móvil?
9. ¿Existe identidad visual o se debe partir de un sistema neutral?
10. ¿Qué métrica y qué volumen justificarían añadir Astro o SSR?
11. ¿Confirmamos Supabase Auth o elegimos otro proveedor de autenticación?

## 19. Recomendación final

Comenzar con Angular, TypeScript, arquitectura standalone, Signals, Reactive Forms, rutas lazy y una capa de API tipada hacia Hono. Usar Cloudflare Pages para hosting, Hono Workers para API, R2 para archivos, Queues para trabajo asíncrono y Hyperdrive para PostgreSQL. Para UI, usar Tailwind + tokens tipo shadcn y `spartan/ui` como base Angular. Mantener Astro fuera del MVP; reconsiderarlo únicamente para un sitio de contenido separado y respaldado por una estrategia SEO real. Alpine.js queda para sitios pequeños o interacciones progresivas, no para el núcleo de Vatucasa.
