import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { catchError, Observable, throwError } from 'rxjs';
import { API_BASE_URL } from '../../common/api/api.tokens';
import { AUTH_LOGIN_PATH } from '../services/auth-token.model';
import { AuthTokenService } from '../services/auth-token.service';
import { SKIP_AUTH_HEADER, SKIP_AUTH_REDIRECT } from './auth-http-context';

export function authApiInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const apiBaseUrl = inject(API_BASE_URL);
  const authTokenService = inject(AuthTokenService);
  const router = inject(Router);
  const isApiRequest = request.url.startsWith(apiBaseUrl);
  const token = authTokenService.getToken();

  if (isApiRequest && !request.context.get(SKIP_AUTH_HEADER)) {
    if (!token && !request.context.get(SKIP_AUTH_REDIRECT)) {
      void router.navigateByUrl(AUTH_LOGIN_PATH);
      return throwError(
        () =>
          new HttpErrorResponse({
            status: 401,
            statusText: 'Missing auth token',
            url: request.url,
          }),
      );
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      toast.error('No se pudo completar la solicitud', {
        description: resolveErrorMessage(error),
      });

      if (isApiRequest && error.status === 401 && !request.context.get(SKIP_AUTH_REDIRECT)) {
        authTokenService.clearToken();
        void router.navigateByUrl(AUTH_LOGIN_PATH);
      }

      return throwError(() => error);
    }),
  );
}

function resolveErrorMessage(error: HttpErrorResponse): string {
  if (typeof error.error?.message === 'string') {
    return error.error.message;
  }

  if (error.status === 0) {
    return 'Revisa tu conexión e intenta de nuevo.';
  }

  return `Error ${error.status || 'desconocido'}.`;
}
