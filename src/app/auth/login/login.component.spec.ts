import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the central auth actions', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Servicios');
    expect(fixture.nativeElement.textContent).toContain('Regístrate');
    expect(fixture.nativeElement.textContent).toContain('Inicia sesión');
  });
});
