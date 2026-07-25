import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthTokenService } from '../auth/services/auth-token.service';
import { RootRedirectComponent } from './root-redirect.component';

describe('RootRedirectComponent', () => {
  let fixture: ComponentFixture<RootRedirectComponent>;
  let hasUsableToken: ReturnType<typeof vi.fn>;
  let navigateByUrl: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    hasUsableToken = vi.fn();
    navigateByUrl = vi.fn();

    await TestBed.configureTestingModule({
      imports: [RootRedirectComponent],
      providers: [
        { provide: AuthTokenService, useValue: { hasUsableToken } },
        { provide: Router, useValue: { navigateByUrl } },
      ],
    }).compileComponents();
  });

  it('redirects anonymous users to the splash route', () => {
    hasUsableToken.mockReturnValue(false);

    fixture = TestBed.createComponent(RootRedirectComponent);
    fixture.detectChanges();

    expect(navigateByUrl).toHaveBeenCalledWith('/start');
  });

  it('redirects authenticated users to the app route', () => {
    hasUsableToken.mockReturnValue(true);

    fixture = TestBed.createComponent(RootRedirectComponent);
    fixture.detectChanges();

    expect(navigateByUrl).toHaveBeenCalledWith('/app');
  });
});
