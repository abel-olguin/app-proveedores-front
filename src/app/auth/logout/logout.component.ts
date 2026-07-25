import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_LOGIN_PATH } from '../services/auth-token.model';
import { AuthTokenService } from '../services/auth-token.service';

@Component({
  selector: 'app-logout',
  template: '',
})
export class LogoutComponent {
  private readonly authTokenService = inject(AuthTokenService);
  private readonly router = inject(Router);

  constructor() {
    this.authTokenService.clearToken();
    void this.router.navigateByUrl(AUTH_LOGIN_PATH);
  }
}
