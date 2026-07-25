import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  APP_HOME_PATH,
  AUTH_LOGIN_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_RECOVER_PASSWORD_PATH,
  AUTH_REGISTER_PATH,
} from './auth-token.model';
import { AuthTokenService } from './auth-token.service';

const PUBLIC_AUTH_PATHS = new Set([AUTH_LOGIN_PATH, AUTH_REGISTER_PATH, AUTH_RECOVER_PASSWORD_PATH]);

@Injectable({ providedIn: 'root' })
export class AuthRedirectService {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly router: Router,
  ) {}

  initialize(): void {
    const currentPath = window.location.pathname;
    const hasToken = this.authTokenService.hasUsableToken();

    queueMicrotask(() => {
      if (hasToken && (currentPath === '/' || PUBLIC_AUTH_PATHS.has(currentPath))) {
        void this.router.navigateByUrl(APP_HOME_PATH);
        return;
      }

      if (!hasToken && currentPath !== AUTH_LOGOUT_PATH && !PUBLIC_AUTH_PATHS.has(currentPath)) {
        void this.router.navigateByUrl(AUTH_LOGIN_PATH);
      }
    });
  }
}
