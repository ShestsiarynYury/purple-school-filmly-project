import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Observable, tap } from 'rxjs';
import { IMovie } from '../../app/shared/models/movie.model';
import { IGenre } from '../../app/shared/const/genres.const';

@Injectable({ providedIn: 'root' })
export class HttpService {
    private _httpClient = inject(HttpClient);
    private _storeService = inject(StoreService);

    public updateGenres$(): Observable<IGenre[]> {
        return this._httpClient.get<IGenre[]>('http://localhost:3000/api/v1/genres').pipe(
            tap((response) => {
                this._storeService.setValue('genres', response);
            }),
        );
    }

    public updateMovies$(value: {
        name: string;
        genre: number | null;
        from: number | null;
        to: number | null;
        sort: 'genre' | 'name' | 'rating';
    }): Observable<IMovie[]> {
        const params = new HttpParams()
            .set('genre', `${value.genre}`)
            .set('from', `${value.from}`)
            .set('to', `${value.to}`)
            .set('sort', `${value.sort}`);

        return this._httpClient
            .get<IMovie[]>('http://localhost:3000/api/v1/movies', { params })
            .pipe(
                tap((response) => {
                    this._storeService.setValue('movies', response);
                }),
            );
    }

    public updateFavorites$(value: {
        name: string;
        genre: number | null;
        from: number | null;
        to: number | null;
        sort: 'genre' | 'name' | 'rating';
    }): Observable<IMovie[]> {
        const params = new HttpParams()
            .set('genre', `${value.genre}`)
            .set('from', `${value.from}`)
            .set('to', `${value.to}`)
            .set('sort', `${value.sort}`);

        return this._httpClient
            .get<IMovie[]>('http://localhost:3000/api/v1/favorites', { params })
            .pipe(
                tap((response) => {
                    this._storeService.setValue('favorites', response);
                }),
            );
    }
}
