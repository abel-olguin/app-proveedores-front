import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportedLanguage } from '../settings/user-settings.model';
import { UserSettingsService } from '../settings/user-settings.service';

@Injectable({ providedIn: 'root' })
export class I18nService {
  constructor(
    private readonly translateService: TranslateService,
    private readonly userSettingsService: UserSettingsService,
  ) {}

  initialize(language: SupportedLanguage): void {
    this.translateService.addLangs(['es-MX', 'en-US']);
    this.translateService.setFallbackLang('es-MX');
    this.translateService.use(language);
  }

  setLanguage(language: SupportedLanguage): void {
    this.translateService.use(language);
    this.userSettingsService.update({ language });
  }
}
