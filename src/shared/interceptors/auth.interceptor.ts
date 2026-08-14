import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStoreService } from '../services/auth-store.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const authStoreService = inject(AuthStoreService);
    const isAuthenticated = authService.isAuthenticated$.getValue();

    if (!isAuthenticated) {
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            Authorization: `${authStoreService.getValue('tokenType')} ${authStoreService.getValue('token')}`,
        },
    });

    return next(authReq);
};
