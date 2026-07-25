import { TestBed } from '@angular/core/testing';
import { UserSettingsService } from '../settings/user-settings.service';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: false }),
      configurable: true,
    });
    TestBed.configureTestingModule({});
  });

  it('applies dark and light theme classes', () => {
    const service = TestBed.inject(ThemeService);

    service.apply('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.dataset['theme']).toBe('dark');

    service.apply('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('persists theme changes through user settings', () => {
    const service = TestBed.inject(ThemeService);
    const settingsService = TestBed.inject(UserSettingsService);

    service.setTheme('dark');

    expect(settingsService.settings()?.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
