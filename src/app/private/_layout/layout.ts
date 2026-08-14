import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Icons } from '../../../shared/icons';
import { Images } from '../../../shared/images';
import { HeaderComponent } from '../components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { StoreService } from '../../../shared/services/store.service';
import { debounceTime, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { HttpService } from '../../../shared/services/http.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FormsModule,
        ReactiveFormsModule,
        SearchInputComponent,
    ],
})
export class PrivateLayoutComponent implements OnInit {
    private _httpService = inject(HttpService);
    private _storeService = inject(StoreService);
    private _destroyRef = inject(DestroyRef);
    private _router = inject(Router);
    Images = Images;
    Icons = Icons;

    readonly genres = toSignal(this._storeService.getValueAsync('genres'));

    form = new FormGroup({
        name: new FormControl<string>('', { nonNullable: true }),
        genre: new FormControl<number | null>(null, { nonNullable: false }),
        from: new FormControl<number | null>(null, { nonNullable: false }),
        to: new FormControl<number | null>(null, { nonNullable: false }),
        sort: new FormControl<'genre' | 'name' | 'rating'>('name', { nonNullable: true }),
    });

    ngOnInit(): void {
        const filters = this._storeService.getValue('filters');
        this.form.patchValue(filters, { emitEvent: false });
        this.form.valueChanges
            .pipe(
                debounceTime(500),
                takeUntilDestroyed(this._destroyRef),
                map((value) => ({
                    name: value['name'] ?? '', // default to empty string if undefined
                    genre: value['genre'] ?? null, // default to null if undefined
                    from: value['from'] ?? null, // default to null if undefined
                    to: value['to'] ?? null, // default to null if undefined
                    sort: value['sort'] ?? 'name', // default to 'name' if undefined
                })),
            )
            .subscribe((value) => {
                this._storeService.setValue('filters', value);

                if (this._router.url.includes('favorites')) {
                    this._httpService.updateFavorites$(value).subscribe();
                }

                if (this._router.url.includes('movies')) {
                    this._httpService.updateMovies$(value).subscribe();
                }
            });

        this._httpService.updateGenres$().subscribe();
    }
}
