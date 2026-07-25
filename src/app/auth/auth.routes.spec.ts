import { authRoutes } from './auth.routes';

describe('authRoutes', () => {
  it('keeps auth-only routes inside the auth router', async () => {
    expect(authRoutes.map((route) => route.path)).toEqual([
      '',
      'login',
      'register',
      'recover-password',
      'logout',
    ]);

    await Promise.all(
      authRoutes
        .filter((route) => route.loadComponent)
        .map((route) => route.loadComponent?.()),
    );
  });
});
