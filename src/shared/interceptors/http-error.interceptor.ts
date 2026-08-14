import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ErrorStoreService, IErrorModel } from '../services/error-store.service';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorstoreService = inject(ErrorStoreService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            const appError: IErrorModel = {
                code: error.status,
                message: error.message,
                url: error.url,
                time: new Date().toISOString(),
            };

            errorstoreService.setValue(appError);
            return throwError(() => error);
        }),
    );
};
