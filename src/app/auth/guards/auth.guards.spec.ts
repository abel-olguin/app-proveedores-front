import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { publicAuthGuard } from './public-auth.guard';
import { AuthTokenService } from '../services/auth-token.service';

describe('auth guards', () => {
  let hasUsableToken: ReturnType<typeof vi.fn>;
  const loginTree = { path: '/auth/login' };
  const appTree = { path: '/app' };

  beforeEach(() => {
    hasUsableToken = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthTokenService, useValue: { hasUsableToken } },
        {
          provide: Router,
          useValue: {
            createUrlTree: vi.fn((path: string[]) => (path[0] === '/app' ? appTree : loginTree)),
          },
        },
      ],
    });
  });

  it('allows protected routes with token and redirects without token', () => {
    hasUsableToken.mockReturnValue(true);
    expect(TestBed.runInInjectionContext(() => authGuard({} as never, {} as never))).toBe(true);

    hasUsableToken.mockReturnValue(false);
    expect(TestBed.runInInjectionContext(() => authGuard({} as never, {} as never))).toBe(loginTree);
  });

  it('allows public auth routes without token and redirects with token', () => {
    hasUsableToken.mockReturnValue(false);
    expect(TestBed.runInInjectionContext(() => publicAuthGuard({} as never, {} as never))).toBe(true);

    hasUsableToken.mockReturnValue(true);
    expect(TestBed.runInInjectionContext(() => publicAuthGuard({} as never, {} as never))).toBe(appTree);
  });
});
