import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../storage/local-storage.service';
import { USER_SETTINGS_STORAGE_KEY, USER_SETTINGS_VERSION } from './user-settings.model';
import { UserSettingsService } from './user-settings.service';

describe('UserSettingsService', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true,
    });
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: true }),
      configurable: true,
    });
    TestBed.configureTestingModule({});
  });

  it('creates default settings from browser preferences when none exist', () => {
    const service = TestBed.inject(UserSettingsService);

    expect(service.initialize()).toEqual({ language: 'en-US', theme: 'dark' });
    expect(service.settings()).toEqual({ language: 'en-US', theme: 'dark' });
  });

  it('uses persisted v1 settings instead of browser preferences', () => {
    const storage = TestBed.inject(LocalStorageService);
    storage.set(
      USER_SETTINGS_STORAGE_KEY,
      USER_SETTINGS_VERSION,
      { language: 'es-MX', theme: 'light' },
      { expiresAt: null },
    );

    expect(TestBed.inject(UserSettingsService).initialize()).toEqual({ language: 'es-MX', theme: 'light' });
  });

  it('updates and persists settings without expiration', () => {
    const service = TestBed.inject(UserSettingsService);

    service.initialize();
    expect(service.update({ theme: 'light' })).toEqual({ language: 'en-US', theme: 'light' });

    const rawSettings = localStorage.getItem('servicios:user-settings');
    expect(rawSettings).toContain('"expiresAt":null');
    expect(rawSettings).toContain('"theme":"light"');
  });
});
