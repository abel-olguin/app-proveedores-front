import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_HOME_PATH } from '../services/auth-token.model';
import { AuthTokenService } from '../services/auth-token.service';

export const publicAuthGuard: CanActivateFn = () => {
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);

  return !authTokenService.hasUsableToken() || router.createUrlTree([APP_HOME_PATH]);
};
