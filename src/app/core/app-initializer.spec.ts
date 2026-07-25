import { I18nService } from './i18n/i18n.service';
import { initializeAppPreferences } from './app-initializer';
import { UserSettings } from './settings/user-settings.model';
import { UserSettingsService } from './settings/user-settings.service';
import { ThemeService } from './theme/theme.service';

describe('initializeAppPreferences', () => {
  it('initializes settings and applies theme and language', () => {
    const settings: UserSettings = { language: 'es-MX', theme: 'dark' };
    const userSettingsService = { initialize: vi.fn().mockReturnValue(settings) };
    const themeService = { apply: vi.fn() };
    const i18nService = { initialize: vi.fn() };

    initializeAppPreferences(
      userSettingsService as unknown as UserSettingsService,
      themeService as unknown as ThemeService,
      i18nService as unknown as I18nService,
    )();

    expect(themeService.apply).toHaveBeenCalledWith('dark');
    expect(i18nService.initialize).toHaveBeenCalledWith('es-MX');
  });
});
