import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_LOGIN_PATH } from '../services/auth-token.model';
import { AuthTokenService } from '../services/auth-token.service';

export const authGuard: CanActivateFn = () => {
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);

  return authTokenService.hasUsableToken() || router.createUrlTree([AUTH_LOGIN_PATH]);
};
