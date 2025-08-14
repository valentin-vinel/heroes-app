import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.user() === undefined) {
    return authService.getUsers().pipe(
      map(_ => {
        return true;
      }),
      catchError(_ => router.navigate(['login']))
    )
  }

  if(authService.user() === null) {
    router.navigate(['login']);
  }

  return true;
};
