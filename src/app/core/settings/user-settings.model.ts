export type SupportedLanguage = 'es-MX' | 'en-US';
export type ThemePreference = 'light' | 'dark';

export interface UserSettings {
  language: SupportedLanguage;
  theme: ThemePreference;
}

export const USER_SETTINGS_STORAGE_KEY = 'user-settings';
export const USER_SETTINGS_VERSION = 1;

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = ['es-MX', 'en-US'];
