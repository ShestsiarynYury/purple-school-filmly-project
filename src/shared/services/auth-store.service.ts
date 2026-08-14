import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IAppAuthStore {
    token: string | null;
    tokenType: string | null;
    expiresIn: string | null;
}

export const STORE_INITIAL_VALUES: IAppAuthStore = {
    token: null,
    tokenType: null,
    expiresIn: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStoreService {
    private _storeSubject = new BehaviorSubject<IAppAuthStore>({ ...STORE_INITIAL_VALUES });

    // getter
    // отдает значение но синхронно
    getValue<K extends keyof IAppAuthStore>(key: K): IAppAuthStore[K] {
        return this._storeSubject.getValue()[key];
    }

    // отдает значение но асинхронно
    getValueAsync<K extends keyof IAppAuthStore>(key: K): Observable<IAppAuthStore[K]> {
        return this._storeSubject.asObservable().pipe(
            map((state) => {
                return state[key];
            }),
        );
    }

    // setter
    setValue<K extends keyof IAppAuthStore>(key: K, value: IAppAuthStore[K]): void {
        this._storeSubject.next({
            ...this._storeSubject.getValue(),
            [key]: value,
        });
    }
}
