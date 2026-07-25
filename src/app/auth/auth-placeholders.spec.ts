import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { PlatformHomeComponent } from '../platform/home/platform-home.component';
import { AuthTokenService } from './services/auth-token.service';
import { LogoutComponent } from './logout/logout.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterComponent } from './register/register.component';

describe('auth placeholder components', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformHomeComponent, RecoverPasswordComponent, RegisterComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders register, recover password and app placeholders', () => {
    const registerFixture = TestBed.createComponent(RegisterComponent);
    registerFixture.detectChanges();
    expect(registerFixture.nativeElement.textContent).toContain('Registro');

    const recoverFixture = TestBed.createComponent(RecoverPasswordComponent);
    recoverFixture.detectChanges();
    expect(recoverFixture.nativeElement.textContent).toContain('Recuperar contraseña');

    const appFixture = TestBed.createComponent(PlatformHomeComponent);
    appFixture.detectChanges();
    expect(appFixture.nativeElement.textContent).toContain('Placeholder de la aplicacion autenticada');
  });

  it('clears token and navigates on logout', () => {
    const clearToken = vi.fn();
    const navigateByUrl = vi.fn();

    TestBed.overrideProvider(AuthTokenService, { useValue: { clearToken } });
    TestBed.overrideProvider(Router, { useValue: { navigateByUrl } });

    TestBed.createComponent(LogoutComponent);

    expect(clearToken).toHaveBeenCalled();
    expect(navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
