import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IGenre } from '../../app/shared/const/genres.const';
import { IMovie } from '../../app/shared/models/movie.model';

export interface IAppStore {
    genres: IGenre[];
    movies: IMovie[];
    favorites: IMovie[];
    filters: {
        name: string;
        genre: number | null;
        from: number | null;
        to: number | null;
        sort: 'genre' | 'name' | 'rating';
    };
}

export const STORE_DEFAULT_VALUE: IAppStore = {
    genres: [],
    movies: [],
    favorites: [],
    filters: {
        name: '',
        genre: null,
        from: null,
        to: null,
        sort: 'name',
    },
};

@Injectable({ providedIn: 'root' })
export class StoreService {
    private readonly _storeSubject = new BehaviorSubject<IAppStore>({
        ...STORE_DEFAULT_VALUE,
    });

    // getter
    // отдает значение но синхронно
    getValue<K extends keyof IAppStore>(key: K): IAppStore[K] {
        return this._storeSubject.getValue()[key];
    }

    // отдает значение но асинхронно
    getValueAsync<K extends keyof IAppStore>(key: K): Observable<IAppStore[K]> {
        return this._storeSubject.asObservable().pipe(
            map((state) => {
                return state[key];
            }),
        );
    }

    getFormValueAsync<K extends keyof IAppStore['filters']>(
        key: K,
    ): Observable<IAppStore['filters'][K]> {
        return this._storeSubject.asObservable().pipe(
            map((state) => {
                return state.filters[key];
            }),
        );
    }

    // setter
    setValue<K extends keyof IAppStore>(key: K, value: IAppStore[K]): void {
        this._storeSubject.next({
            ...this._storeSubject.getValue(),
            [key]: value,
        });
    }

    public setFormValue<K extends keyof IAppStore['filters']>(
        key: K,
        value: IAppStore['filters'][K],
    ): void {
        this._storeSubject.next({
            ...this._storeSubject.getValue(),
            filters: {
                ...this._storeSubject.getValue().filters,
                [key]: value,
            },
        });
    }
}
