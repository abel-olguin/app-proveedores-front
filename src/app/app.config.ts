import { ApplicationConfig, provideAppInitializer, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthRedirectService } from './auth/services/auth-redirect.service';
import { authApiInterceptor } from './auth/interceptors/auth-api.interceptor';
import { initializeAppPreferences } from './common/app-initializer';
import { I18nService } from './common/i18n/i18n.service';
import { UserSettingsService } from './common/settings/user-settings.service';
import { ThemeService } from './common/theme/theme.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authApiInterceptor])),
    provideTranslateService({
      fallbackLang: 'es-MX',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
    provideAppInitializer(() =>
      initializeAppPreferences(
        inject(UserSettingsService),
        inject(ThemeService),
        inject(I18nService),
        inject(AuthRedirectService),
      )(),
    ),
  ],
};
