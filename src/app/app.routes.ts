import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  // {
  //   path: 'dashboard',
  //   canActivate: [authGuard],
  //   loadComponent: () =>
  //     import('./pages/dashboard/dashboard.component')
  //       .then(m => m.DashboardComponent)
  // },
  // {
  //   path: 'floor',
  //   canActivate: [authGuard],
  //   loadComponent: () =>
  //     import('./pages/floor/floor.component')
  //       .then(m => m.FloorComponent)
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
