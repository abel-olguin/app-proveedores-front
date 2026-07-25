# Guia Para Agentes De IA

Este repositorio contiene el frontend privado para proveedores de Vatucasa.

## Decisiones Vigentes

- Usar Angular 22 o superior.
- Mantener Spartan UI como base de componentes.
- Usar Signals para estado local de UI siempre que sea razonable.
- Evitar Reactive Forms salvo que el equipo lo apruebe explicitamente.
- Mantener RxJS al minimo necesario por Angular o integraciones puntuales.
- No agregar dependencias sin una razon concreta de producto o arquitectura.
- La plataforma no es publica ni SEO-first; WordPress cubre la landing publica.

## Flujo De Trabajo

- Revisar `docs/` antes de cambiar alcance de producto.
- Preferir componentes standalone y rutas lazy cuando empiece el dashboard real.
- Mantener textos visibles en espanol neutral para Mexico.
- No introducir crawlers, indexing hints, metadatos SEO promocionales ni sitemaps publicos.
- Validar cambios con `npm run build` antes de entregar.

## Privacidad Y Crawling

`public/robots.txt` y `public/llms.txt` deben bloquear crawlers. No relajar esas reglas sin una
solicitud explicita del usuario.
