import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authMedicoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isRoleMedico();
};
