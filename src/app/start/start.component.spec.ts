import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { StartComponent } from './start.component';

describe('StartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartComponent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    const translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('es-MX', {
      auth: {
        splash: {
          title: 'Servicios',
          description: 'Encuentra y conecta con profesionales verificados cerca de ti',
          register: 'Regístrate',
          login: 'Inicia sesión',
        },
      },
    });
    translateService.use('es-MX');
  });

  it('renders centered splash actions', () => {
    const fixture = TestBed.createComponent(StartComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Servicios');
    expect(fixture.nativeElement.textContent).toContain('Regístrate');
    expect(fixture.nativeElement.textContent).toContain('Inicia sesión');
  });
});
