# Servicios Front

Frontend privado para el panel de servicios.

## Stack Inicial

- Angular 22
- Spartan UI
- Tailwind CSS v4 requerido por Spartan
- Font Awesome Angular

## Comandos

```bash
npm run start
npm run build
npm test -- --watch=false
```

Angular 22 requiere Node `^22.22.3 || ^24.15.0 || >=26.0.0`. Si tu Node local es menor,
actualizalo antes de correr los comandos sin un runtime temporal.

## Documentacion

- `docs/` conserva la documentacion existente del proyecto.
- `AGENTS.md` define reglas para agentes de IA que trabajen en este repo.
- `public/robots.txt` y `public/llms.txt` bloquean crawling e indexacion.
