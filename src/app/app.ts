import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { TranslatePipe } from '@ngx-translate/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { I18nService } from './core/i18n/i18n.service';
import { SupportedLanguage, ThemePreference } from './core/settings/user-settings.model';
import { UserSettingsService } from './core/settings/user-settings.service';
import { ThemeService } from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [FontAwesomeModule, FormsModule, HlmButton, NgOptionComponent, NgSelectComponent, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly shieldIcon = faShieldHalved;
  protected readonly readinessItems = [
    'app.readiness.angular',
    'app.readiness.spartan',
    'app.readiness.fontAwesome',
    'app.readiness.privacy',
    'app.readiness.settings',
    'app.readiness.i18n',
  ];

  protected readonly languages = [
    { value: 'es-MX', labelKey: 'app.preferences.languages.esMx' },
    { value: 'en-US', labelKey: 'app.preferences.languages.enUs' },
  ] as const;

  protected readonly themes = [
    { value: 'light', labelKey: 'app.preferences.themes.light' },
    { value: 'dark', labelKey: 'app.preferences.themes.dark' },
  ] as const;

  constructor(
    protected readonly userSettingsService: UserSettingsService,
    private readonly i18nService: I18nService,
    private readonly themeService: ThemeService,
  ) {}

  protected setLanguage(language: string): void {
    this.i18nService.setLanguage(language as SupportedLanguage);
  }

  protected setTheme(theme: string): void {
    this.themeService.setTheme(theme as ThemePreference);
  }
}
