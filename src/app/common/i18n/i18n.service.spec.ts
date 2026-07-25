import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: false }),
      configurable: true,
    });
    TestBed.configureTestingModule({
      providers: [provideTranslateService()],
    });
  });

  it('initializes supported languages and active language', () => {
    const service = TestBed.inject(I18nService);
    const translateService = TestBed.inject(TranslateService);
    const useSpy = vi.spyOn(translateService, 'use');

    service.initialize('es-MX');

    expect(translateService.getLangs()).toEqual(['es-MX', 'en-US']);
    expect(useSpy).toHaveBeenCalledWith('es-MX');
  });

  it('changes language and persists it in settings', () => {
    const service = TestBed.inject(I18nService);
    const translateService = TestBed.inject(TranslateService);
    const useSpy = vi.spyOn(translateService, 'use');

    service.setLanguage('en-US');

    expect(useSpy).toHaveBeenCalledWith('en-US');
    expect(localStorage.getItem('servicios:user-settings')).toContain('"language":"en-US"');
  });
});
