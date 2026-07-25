import { routes } from './app.routes';

describe('routes', () => {
  it('defines root, platform and auth lazy route boundaries', async () => {
    expect(routes.map((route) => route.path)).toEqual(['', 'start', 'app', 'auth', '**']);

    const rootRoute = routes.find((route) => route.path === '');
    const startRoute = routes.find((route) => route.path === 'start');
    const appRoute = routes.find((route) => route.path === 'app');
    const authRoute = routes.find((route) => route.path === 'auth');

    await rootRoute?.loadComponent?.();
    await startRoute?.loadComponent?.();
    await appRoute?.loadComponent?.();
    await authRoute?.loadChildren?.();
  });
});
