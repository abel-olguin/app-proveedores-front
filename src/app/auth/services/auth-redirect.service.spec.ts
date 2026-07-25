import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthTokenService } from './auth-token.service';
import { AuthRedirectService } from './auth-redirect.service';

describe('AuthRedirectService', () => {
  let navigateByUrl: ReturnType<typeof vi.fn>;
  let hasUsableToken: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigateByUrl = vi.fn();
    hasUsableToken = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        AuthRedirectService,
        { provide: Router, useValue: { navigateByUrl } },
        { provide: AuthTokenService, useValue: { hasUsableToken } },
      ],
    });
  });

  it('redirects root with token to app', async () => {
    history.pushState(null, '', '/');
    hasUsableToken.mockReturnValue(true);

    TestBed.inject(AuthRedirectService).initialize();
    await Promise.resolve();

    expect(navigateByUrl).toHaveBeenCalledWith('/app');
  });

  it('redirects protected path without token to auth splash', async () => {
    history.pushState(null, '', '/app');
    hasUsableToken.mockReturnValue(false);

    TestBed.inject(AuthRedirectService).initialize();
    await Promise.resolve();

    expect(navigateByUrl).toHaveBeenCalledWith('/auth');
  });

  it('keeps public auth routes without token', async () => {
    history.pushState(null, '', '/auth/register');
    hasUsableToken.mockReturnValue(false);

    TestBed.inject(AuthRedirectService).initialize();
    await Promise.resolve();

    expect(navigateByUrl).not.toHaveBeenCalled();
  });
});
