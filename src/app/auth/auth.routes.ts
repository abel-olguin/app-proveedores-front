import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { publicAuthGuard } from './guards/public-auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canActivate: [publicAuthGuard],
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [publicAuthGuard],
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'recover-password',
    canActivate: [publicAuthGuard],
    loadComponent: () => import('./recover-password/recover-password.component').then((m) => m.RecoverPasswordComponent),
  },
  {
    path: 'logout',
    canActivate: [authGuard],
    loadComponent: () => import('./logout/logout.component').then((m) => m.LogoutComponent),
  },
];
