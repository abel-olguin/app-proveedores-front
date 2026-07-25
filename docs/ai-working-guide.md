# Guia Inicial De Trabajo Con IA

## Objetivo

Documentar las reglas base para colaborar con agentes de IA en el frontend privado de Vatucasa
Proveedores.

## Reglas De Implementacion

- Preservar Angular 22+, Spartan UI y Signals.
- No agregar librerias nuevas sin justificar el impacto.
- Mantener la documentacion editable en Markdown dentro de `docs/`.
- Usar componentes compartidos cuando un patron se repita.
- Evitar soluciones orientadas a SEO publico dentro de esta app.

## Verificacion Esperada

- Ejecutar `npm run build`.
- Revisar que `public/robots.txt` y `public/llms.txt` sigan bloqueando crawlers.
- Confirmar que la UI inicial no conserve contenido default de Angular.
