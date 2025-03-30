import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateService } from '../services/state.service';

export const bookSelectedByUserGuard: CanActivateFn = () => {
  const canActivate = !!inject<StateService>(StateService).getSelectedWork();
  const router = inject<Router>(Router);
  return canActivate || router.createUrlTree(['/']);
};
