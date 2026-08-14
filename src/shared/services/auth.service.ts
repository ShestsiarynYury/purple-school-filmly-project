import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap, catchError, map, EMPTY, BehaviorSubject } from 'rxjs';
import { AuthStoreService, IAppAuthStore } from './auth-store.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _httpClient = inject(HttpClient);
    private _authStoreService = inject(AuthStoreService);

    login$(email: string, password: string): Observable<boolean> {
        return this._httpClient
            .post<IAppAuthStore>('http://localhost:3000/api/v1/auth', { email, password })
            .pipe(
                tap((response) => {
                    this._updateAuthDate(response);
                }),
                map((response) => response?.token != null),
                catchError(() => {
                    return EMPTY;
                }),
            );
    }

    logout$(): Observable<boolean> {
        return this._httpClient.post<string>('http://localhost:3000/api/v1/auth', null).pipe(
            tap(() => {
                this._updateAuthDate(null);
                this.isAuthenticated$.next(false);
            }),
            map(() => this.isAuthenticated$.getValue()),
        );
    }

    private _updateAuthDate(data: IAppAuthStore | null): void {
        if (data != null) {
            this._authStoreService.setValue('token', data.token);
            this._authStoreService.setValue('tokenType', data.tokenType);
            this._authStoreService.setValue('expiresIn', data.expiresIn);

            this.isAuthenticated$.next(true);
        } else {
            this._authStoreService.setValue('token', null);
            this._authStoreService.setValue('tokenType', null);
            this._authStoreService.setValue('expiresIn', null);

            this.isAuthenticated$.next(false);
        }
    }

    isAuthenticated$ = new BehaviorSubject(true);
}
