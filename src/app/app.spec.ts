import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockReturnValue({ matches: false }),
      configurable: true,
    });

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslateService()],
    }).compileComponents();

    const translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('es-MX', {
      app: {
        title: 'Servicios',
        eyebrow: 'Plataforma privada',
        description: 'Descripcion de prueba',
        actions: {
          spartanLoaded: 'Spartan cargado',
          ready: 'Listo para construir',
        },
        preferences: {
          language: 'Idioma',
          theme: 'Tema',
          languages: {
            esMx: 'Español',
            enUs: 'English',
          },
          themes: {
            light: 'Claro',
            dark: 'Oscuro',
          },
        },
        readiness: {
          angular: 'Angular 22 inicializado',
          spartan: 'Spartan UI activo',
          fontAwesome: 'Font Awesome Angular cargado',
          privacy: 'Robots y llms bloquean crawling',
          settings: 'Settings v1 persistentes',
          i18n: 'Traducciones listas',
        },
      },
    });
    translateService.use('es-MX');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Servicios');
    expect(compiled.textContent).toContain('Spartan cargado');
  });
});
