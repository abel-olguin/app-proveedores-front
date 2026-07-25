import { AuthRedirectService } from '../auth/services/auth-redirect.service';
import { I18nService } from './i18n/i18n.service';
import { UserSettingsService } from './settings/user-settings.service';
import { ThemeService } from './theme/theme.service';

export function initializeAppPreferences(
  userSettingsService: UserSettingsService,
  themeService: ThemeService,
  i18nService: I18nService,
  authRedirectService: AuthRedirectService,
): () => void {
  return () => {
    const settings = userSettingsService.initialize();

    themeService.apply(settings.theme);
    i18nService.initialize(settings.language);
    authRedirectService.initialize();
  };
}
