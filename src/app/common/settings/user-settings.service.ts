import { Injectable, signal } from '@angular/core';
import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  ThemePreference,
  UserSettings,
  USER_SETTINGS_STORAGE_KEY,
  USER_SETTINGS_VERSION,
} from './user-settings.model';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
  private readonly settingsSignal = signal<UserSettings | null>(null);
  readonly settings = this.settingsSignal.asReadonly();

  constructor(private readonly localStorageService: LocalStorageService) {}

  initialize(): UserSettings {
    this.localStorageService.pruneExpired();

    const storedSettings = this.localStorageService.get<UserSettings>(
      USER_SETTINGS_STORAGE_KEY,
      USER_SETTINGS_VERSION,
    );

    const settings = storedSettings ?? this.createDefaultSettings();
    this.persist(settings);

    return settings;
  }

  update(partialSettings: Partial<UserSettings>): UserSettings {
    const currentSettings = this.settingsSignal() ?? this.initialize();
    const nextSettings = { ...currentSettings, ...partialSettings };

    this.persist(nextSettings);

    return nextSettings;
  }

  private persist(settings: UserSettings): void {
    this.localStorageService.set(USER_SETTINGS_STORAGE_KEY, USER_SETTINGS_VERSION, settings, {
      expiresAt: null,
    });
    this.settingsSignal.set(settings);
  }

  private createDefaultSettings(): UserSettings {
    return {
      language: this.detectLanguage(),
      theme: this.detectTheme(),
    };
  }

  private detectLanguage(): SupportedLanguage {
    const browserLanguage = navigator.language;
    const exactMatch = SUPPORTED_LANGUAGES.find((language) => language === browserLanguage);
    const languageMatch = SUPPORTED_LANGUAGES.find((language) =>
      language.toLowerCase().startsWith(browserLanguage.split('-')[0].toLowerCase()),
    );

    return exactMatch ?? languageMatch ?? 'es-MX';
  }

  private detectTheme(): ThemePreference {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
