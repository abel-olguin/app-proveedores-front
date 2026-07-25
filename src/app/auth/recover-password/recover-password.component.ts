import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  imports: [RouterLink],
  template: `
    <main class="auth-placeholder">
      <section>
        <h1>Recuperar contraseña</h1>
        <p>El flujo de recuperacion de contraseña se conectara aqui.</p>
        <a routerLink="/auth/login">Volver al login</a>
      </section>
    </main>
  `,
  styles: [
    `
      .auth-placeholder {
        min-height: 100dvh;
        display: grid;
        place-items: center;
        padding: 24px;
        background: var(--background);
        color: var(--foreground);
      }

      section {
        width: min(100%, 420px);
        display: grid;
        gap: 12px;
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
export class RecoverPasswordComponent {}
