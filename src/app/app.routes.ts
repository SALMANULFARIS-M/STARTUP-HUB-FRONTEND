import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'seats',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/seats/seats.component')
        .then(m => m.SeatsComponent)
  },
  {
    path: 'cabins',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/cabins/cabins.component')
        .then(m => m.CabinsComponent)
  },
  {
    path: 'training-rooms',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/training-rooms/training-rooms.component')
        .then(m => m.TrainingRoomsComponent)
  },
  {
    path: 'payment',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/payments/payment/payment.component')
        .then(m => m.PaymentComponent)
  },
  {
    path: 'payment/processing',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/payments/processing/processing.component')
        .then(m => m.ProcessingComponent)
  },
  {
    path: 'payment/success',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/payments/success/success.component')
        .then(m => m.SuccessComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
