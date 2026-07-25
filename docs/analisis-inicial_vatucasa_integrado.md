# Vatucasa - análisis inicial de producto y negocio

Versión integrada y actualizada.

## Concepto del producto

Vatucasa es una plataforma web para descubrir y contactar proveedores de servicios a domicilio, enfocada inicialmente en estéticas y plomeros. Su objetivo es facilitar el descubrimiento, la conversación inicial y la concreción de una cita, sin gestionar precios ni cobros en la primera etapa operativa.

El valor del producto está en reunir búsqueda, perfil profesional, chat y agenda en una sola experiencia. En vez de depender de WhatsApp, Facebook o búsquedas dispersas, el usuario puede encontrar opciones, conversar y dejar una cita registrada dentro del sistema.

## Propuesta de valor

Para el cliente, Vatucasa reduce fricción al encontrar un proveedor confiable, revisar su trabajo y concretar una cita. Para el proveedor, ofrece presencia digital, captación de contactos y una herramienta para convertir conversaciones en citas reales.

La lógica de producto es simple: primero conversación, luego cita. Eso se adapta mejor a servicios donde hace falta contexto antes de comprometer fecha y hora.

## Alcance inicial

La primera versión será una web app responsive centrada en listado, búsqueda, chat y agenda. La plataforma no administrará precios, cotizaciones ni cobros por servicio; el valor económico del servicio se definirá entre cliente y proveedor durante la conversación o en el lugar del servicio.

- Listado público de proveedores por categoría.
- Búsqueda por servicio específico, por ejemplo corte de cabello o destapar drenaje.
- Perfil público del proveedor con descripción, categoría principal, galería, servicios, calificación y zona de atención.
- Perfil de cliente para generar confianza ante proveedores.
- Chat entre cliente y proveedor.
- Widgets dentro del chat para crear y gestionar citas sin salir de la conversación.
- Calendario del proveedor con confirmación de la propuesta de fecha.
- Notificaciones y recordatorios.
- Estados simples de avance de la cita.
- Suscripción de proveedor para prioridad, marketing, promociones y mayor capacidad operativa.
- Suscripción de cliente para eliminar publicidad, badge de verificación y beneficios.
- Roles base: cliente, proveedor, administrador y staff.
- Roles personalizados basados en permisos.
- Administración de usuarios, proveedores, roles, permisos, categorías, publicidad y moderación.
- Gamificación básica con puntos, logros y canje de beneficios internos.
- Catálogo inicial generado mediante crawlers.
- Políticas, términos y condiciones obligatorios.

## Roles

### Cliente

El cliente busca, conversa, agenda, ve calificaciones y puede calificar a un proveedor si hubo una cita verificada. También contará con perfil propio, que podrá mostrar señales de confianza como verificación, historial básico permitido y badges.

### Proveedor

El proveedor publica su perfil, atiende mensajes, administra su disponibilidad, genera promociones/descuentos y mejora su exposición mediante suscripción, publicidad adicional o beneficios obtenidos por gamificación.

### Administrador

El administrador gestiona la operación general: usuarios, proveedores, categorías, servicios, roles, permisos, suscripciones, publicidad, moderación, políticas y auditoría.

### Staff

Staff es el rol base para el equipo de soporte. Debe estar construido sobre permisos configurables para poder crear roles personalizados posteriores sin reescribir la autorización. El staff atiende incidencias, revisa reportes y escala casos al administrador cuando requieran suspensión, cambios de configuración o decisiones sensibles.

## Experiencia del cliente

1. Entrar a la plataforma y elegir una categoría.
2. Buscar un servicio específico o explorar proveedores disponibles.
3. Revisar el perfil del proveedor y su calificación.
4. Revisar o completar su propio perfil de cliente.
5. Iniciar una conversación por chat.
6. Aclarar el servicio requerido y resolver dudas.
7. Usar widgets de cita dentro del chat cuando exista intención clara de contratación.
8. Seleccionar fecha y hora disponibles.
9. Esperar aceptación del proveedor.
10. Recibir confirmación y recordatorios.
11. Compartir ubicación y teléfono solo cuando la cita esté acordada.
12. Consultar el avance de la cita mediante estatus.
13. Calificar al proveedor después del servicio si la cita fue verificada.
14. Ganar puntos por logros y canjear beneficios internos, como un mes de premium.

## Experiencia del proveedor

1. Crear cuenta con correo u OAuth según el proveedor de autenticación definido.
2. Completar perfil con foto, descripción, categoría principal, servicios y galería.
3. Definir zona de cobertura y disponibilidad.
4. Recibir mensajes por chat.
5. Aceptar, rechazar o ajustar solicitudes de cita desde widgets internos del chat.
6. Gestionar su calendario.
7. Actualizar estatus del servicio cuando aplique.
8. Crear promociones y descuentos.
9. Administrar su suscripción y publicidad adicional.
10. Acumular reseñas verificadas.
11. Ganar puntos por logros y canjear beneficios internos, como días de publicidad gratis.

## Experiencia del administrador

- Aprobar, suspender o eliminar cuentas de proveedor.
- Gestionar categorías, servicios y zonas de cobertura disponibles.
- Gestionar roles personalizados, permisos y asignaciones.
- Administrar suscripciones, prioridades y reglas de visibilidad.
- Configurar y supervisar publicidad.
- Consultar métricas generales de uso, citas y conversión.
- Definir políticas de uso, moderación y penalización de cuentas.
- Revisar crawler/importación inicial de proveedores.

## Experiencia de soporte

- Revisar y resolver reportes de usuarios sobre chats, citas o comportamiento indebido.
- Mediar en conflictos entre cliente y proveedor relacionados con una cita específica.
- Reenviar o corregir notificaciones que no llegaron correctamente.
- Escalar a administrador los casos que requieran suspensión de cuenta o cambios de configuración.
- Responder consultas frecuentes sobre uso de la plataforma, registro o suscripción.

## Perfil del proveedor

- Nombre comercial o profesional.
- Imagen principal.
- Descripción corta.
- Categoría principal.
- Servicios ofrecidos.
- Galería de trabajos.
- Calificación y reseñas.
- Zona de atención.
- Disponibilidad general.
- Promociones y descuentos activos.
- Indicador de proveedor destacado o plan activo, cuando aplique.

## Perfil del cliente

El perfil de cliente también debe generar confianza hacia proveedores de servicio. Puede incluir nombre visible, avatar, badge de verificación, señales de cuenta activa, historial básico permitido por privacidad, badges de gamificación y estado premium cuando aplique.

La información sensible no debe exponerse antes de concretar una agenda. Teléfono y ubicación solo se comparten cuando ambas partes aceptan la cita.

## Calificaciones y reseñas

El cliente puede ver calificaciones y reseñas públicas de cualquier proveedor. La calificación solo se habilita si existe una cita verificada como completada; eso evita reseñas falsas y conecta la reputación con experiencia real.

- Cliente ve calificaciones antes de contactar al proveedor.
- Cliente califica solo si tuvo una cita verificada y completada.
- Una cita cancelada o rechazada no habilita calificación.
- Cada cita solo puede generar una calificación.
- La reputación pública del proveedor se construye con citas reales.

## Chat y agenda

El chat es el centro operativo del producto. La agenda está embebida dentro de la conversación mediante widgets para que la cita se formalice sin sacar a las partes del mismo flujo.

- El cliente inicia conversación desde el perfil del proveedor.
- Ambas partes aclaran el servicio por mensaje.
- Dentro del chat existen widgets para proponer, aceptar, rechazar, reprogramar y cancelar citas.
- El cliente propone fecha y hora basadas en disponibilidad visible.
- El proveedor acepta, rechaza o propone otro horario.
- Al aceptarse, la cita queda confirmada en el calendario de ambas partes.
- Antes de la confirmación no se permite compartir teléfono, correo ni ubicación exacta.

Para reducir desintermediación, el chat debe bloquear teléfonos y correos mediante detección de patrones, incluyendo intentos con espacios, puntos, separadores, emojis o texto ofuscado.

## Estados de la cita

Los estatus deben ser simples, entendibles y útiles para el cliente. En la primera etapa no dependen obligatoriamente de GPS; funcionan como actualizaciones manuales del proveedor.

| Estado | Significado |
|---|---|
| Solicitud enviada | El cliente propuso una cita y está pendiente de respuesta. |
| Cita confirmada | El proveedor aceptó la fecha y hora. |
| Salida programada | El proveedor confirmó que la visita sigue en pie y se prepara para salir. |
| En trayecto | El proveedor ya va camino al domicilio. |
| Llegada próxima | El proveedor está cerca del punto de atención. |
| En domicilio | El proveedor ya llegó al lugar. |
| Servicio en proceso | La atención ya comenzó. |
| Servicio finalizado | La visita terminó y se puede dejar reseña. |

Estados adicionales recomendados: reprogramada, cancelada y demora reportada.

## Suscripción y monetización

El modelo de monetización combina planes de proveedor, planes de cliente, publicidad adicional y promociones. Los pagos se habilitarán gradualmente mediante feature flags y se procesarán con Stripe para tarjetas y suscripciones automatizadas.

### Proveedor Plus

Los planes de proveedor tendrán precios de 99, 249, 499 y 999 pesos al mes. Los primeros tres planes incluyen límites mensuales de trabajos aceptados por la plataforma; el plan de 999 no tendrá límite.

| Plan | Precio mensual | Límite de trabajos | Soporte | Beneficios |
|---|---:|---|---|---|
| Plus Inicial | $99 | limitado | regular | presencia mejorada inicial |
| Plus Crecimiento | $249 | limitado | regular | mayor capacidad y herramientas |
| Plus Pro | $499 | limitado | prioritario | promociones, descuentos y más facilidades |
| Plus Máximo | $999 | sin límite | prioritario | capacidad completa, promociones y beneficios máximos |

Proveedor Plus también puede incluir acceso a promociones/descuentos, retiro de publicidad en sus pantallas de trabajo, más facilidades operativas y posibilidad de comprar anuncios adicionales. Los anuncios a proveedores son un costo adicional separado de la suscripción.

### Cliente sin anuncios y cliente premium

| Plan | Precio mensual | Beneficios |
|---|---:|---|
| Cliente sin anuncios | $49 | elimina publicidad, badge de verificado, acceso/candidatura a promociones y descuentos |
| Cliente premium | $99 | beneficios del plan sin anuncios y soporte prioritario |

El plan de 49 pesos no incluye soporte prioritario.

## Gamificación

La gamificación básica será parte del MVP y gratuita para todos. Clientes y proveedores ganan puntos por logros o retos y pueden canjearlos por beneficios internos.

Ejemplos:

- Clientes: completar perfil, concretar primera cita, dejar reseñas verificadas, mantener buen historial.
- Proveedores: completar perfil, responder rápido, concretar citas, mantener buenas reseñas, publicar promociones responsables.
- Canjes cliente: un mes gratis de premium u otros beneficios internos.
- Canjes proveedor: días de publicidad gratis, visibilidad temporal u otros beneficios operativos.

## Reglas de negocio

- El cliente puede navegar y buscar sin registrarse, pero necesita cuenta para usar chat o agendar.
- El proveedor debe completar un perfil mínimo para aparecer en el listado público.
- El proveedor debe seleccionar una categoría principal.
- La búsqueda funciona por categoría, servicio específico y distancia.
- El chat es el canal principal para iniciar la relación entre cliente y proveedor.
- La cita solo queda confirmada cuando el proveedor acepta la propuesta.
- La plataforma no fija precios ni procesa pagos del servicio en esta fase.
- Los estatus de cita son manuales y opcionales para el proveedor.
- Las reseñas solo se habilitan después de una cita marcada como finalizada.
- La prioridad en resultados y anuncios debe estar etiquetada y controlada por reglas.
- Teléfonos, correos y ubicación exacta están prohibidos en chat antes de una cita confirmada.
- Las políticas y términos deben aceptarse para operar.
- Los features comerciales se activan gradualmente con feature flags.

## Pros del negocio

- Reduce la complejidad técnica frente a una plataforma transaccional completa.
- Se enfoca en el punto de más valor inmediato: descubrimiento, contacto y cita.
- El chat se adapta bien a servicios que requieren contexto previo.
- La agenda agrega estructura sin forzar una reserva rígida desde el primer clic.
- La suscripción del proveedor tiene una promesa comercial clara.
- La gamificación puede incentivar uso temprano sin cobrar desde el primer día.
- Permite evolucionar después a GPS, pagos por servicio o más categorías sin sobrecargar el MVP.

## Contras y riesgos

- Parte del valor económico de la transacción queda fuera de la plataforma.
- Existe riesgo alto de desintermediación si el usuario mueve la conversación fuera del sistema.
- La promesa de prioridad en resultados requiere suficiente tráfico para percibirse valiosa.
- La calidad del catálogo inicial es crítica para que la experiencia se sienta útil desde temprano.
- Crawlers requieren revisión, consentimiento y limpieza de datos antes de activar proveedores.
- La monetización debe activarse con cuidado para no frenar adopción inicial.

## Competencia

La competencia principal no será una app idéntica, sino los canales informales que ya resuelven parte del problema: grupos de Facebook, WhatsApp, Instagram en categorías visuales, Google Maps y recomendaciones boca a boca. Vatucasa necesita diferenciarse por orden, claridad, reputación, protección de confianza y mejor experiencia de contacto.

## Áreas de crecimiento

- Nuevas categorías de servicios a domicilio.
- Filtros más detallados por zona, urgencia o tipo de servicio.
- GPS opcional para proveedores que quieran dar seguimiento más visible.
- Planes premium más completos para proveedores.
- Beneficios adicionales para clientes suscritos.
- Pagos o anticipos dentro de plataforma en una fase posterior, si el modelo lo justifica.
- Landing en WordPress para SEO como último paso de despliegue.

## Roadmap sugerido

### Fase 1

- Listado por categoría.
- Búsqueda por servicio.
- Catálogo inicial mediante crawlers.
- Perfiles de proveedor y cliente.
- Chat con widgets de cita.
- Agenda dentro del chat.
- Notificaciones.
- Roles base y roles personalizados por permisos.
- Administración básica, incluyendo roles y permisos.
- Sesiones con JWT, refresh tokens y tokens registrados.
- Promociones/descuentos.
- Gamificación básica.
- Stripe preparado detrás de feature flags.
- Políticas y términos obligatorios.

### Fase 2

- Mejor ranking y relevancia en búsquedas.
- Activación gradual de planes pagados.
- Métricas para proveedores.
- Más herramientas administrativas.
- Mejoras en estatus de cita.
- Beneficios extra para clientes suscritos.

### Fase 3

- GPS opcional.
- Expansión de categorías y ciudades.
- Mayor profundidad en reputación.
- Matching más inteligente entre búsqueda y proveedor.
- Evaluación de pagos o anticipos dentro de plataforma.
- Landing WordPress orientado a SEO.

## Recomendación general

La dirección de Vatucasa es más ejecutable si se lanza como marketplace conversacional con búsqueda por servicio, chat como eje central, agenda integrada, perfiles de confianza para ambas partes, monetización gradual y reglas fuertes contra desintermediación.

El primer objetivo debe ser generar catálogo, uso y fidelización. Los pagos, publicidad y beneficios comerciales deben existir en el modelo desde el inicio, pero activarse por feature flags cuando existan señales suficientes de adopción.
