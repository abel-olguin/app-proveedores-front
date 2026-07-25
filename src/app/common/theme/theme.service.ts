import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ThemePreference } from '../settings/user-settings.model';
import { UserSettingsService } from '../settings/user-settings.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly userSettingsService: UserSettingsService,
  ) {}

  apply(theme: ThemePreference): void {
    const root = this.document.documentElement;

    root.classList.toggle('dark', theme === 'dark');
    root.dataset['theme'] = theme;
  }

  setTheme(theme: ThemePreference): void {
    this.apply(theme);
    this.userSettingsService.update({ theme });
  }
}
