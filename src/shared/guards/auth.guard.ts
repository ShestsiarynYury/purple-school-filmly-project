import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	const authService: AuthService = inject(AuthService);

	return authService.isAuthenticated;
};
