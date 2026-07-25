import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-platform-home',
  imports: [RouterLink],
  template: `
    <main class="platform-home">
      <section>
        <h1>Servicios</h1>
        <p>Placeholder de la aplicacion autenticada.</p>
        <a routerLink="/auth/logout">Cerrar sesion</a>
      </section>
    </main>
  `,
  styles: [
    `
      .platform-home {
        min-height: 100dvh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--background);
        color: var(--foreground);
      }

      section {
        width: min(100%, 520px);
        display: grid;
        gap: 14px;
        text-align: center;
      }

      h1,
      p {
        margin: 0;
      }

      a {
        color: var(--primary);
        font-weight: 800;
      }
    `,
  ],
})
export class PlatformHomeComponent {}
