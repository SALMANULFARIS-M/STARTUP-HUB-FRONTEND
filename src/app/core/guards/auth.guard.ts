import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.get();

  if (token) {
    // User is logged in → allow access
    return true;
  }

  // Not logged in → redirect to login
  router.navigate(['/login']);
  return false;
};
