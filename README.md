# Servicios Front

Frontend privado para el panel de servicios.

## Stack Inicial

- Angular 22
- Spartan UI
- Tailwind CSS v4 requerido por Spartan
- Font Awesome Angular
- ngx-translate

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

## Estructura Angular

- `src/app/auth/`: rutas, pantallas, guards, token e interceptores relacionados con autenticacion.
- `src/app/platform/`: experiencia autenticada de la plataforma.
- `src/app/common/`: servicios compartidos entre auth y plataforma, como API, storage, settings, tema e i18n.
- `src/app/shared/`: primitivos/componentes de UI compartidos.

## Calidad

La suite de tests exige 80% global de statements, branches, functions y lines para el codigo propio
de la app. Los primitivos generados por Spartan en `src/app/shared/ui/` se tratan como codigo
vendorizado y quedan fuera del umbral.

## Preferencias

`UserSettingsService` guarda settings v1 sin expiracion usando el storage versionado. El initializer
crea idioma y tema desde preferencias del navegador si no existen; si el usuario los cambia, se
persisten y se reusan en siguientes arranques.
