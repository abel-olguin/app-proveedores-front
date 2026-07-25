import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    const translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('es-MX', {
      auth: {
        login: {
          back: 'Volver',
          title: 'Inicia sesión en tu cuenta',
          email: 'Correo electrónico',
          password: 'Contraseña',
          showPassword: 'Mostrar',
          hidePassword: 'Ocultar',
          continue: 'Continuar',
          forgotPassword: '¿Olvidaste tu contraseña?',
          or: 'O',
          continueWithGoogle: 'Continúa con Google',
        },
      },
    });
    translateService.use('es-MX');
  });

  it('renders the login form actions', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Inicia sesión en tu cuenta');
    expect(fixture.nativeElement.textContent).toContain('Continuar');
    expect(fixture.nativeElement.textContent).toContain('Continúa con Google');
  });
});
