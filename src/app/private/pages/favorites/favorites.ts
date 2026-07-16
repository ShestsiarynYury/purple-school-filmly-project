import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreService } from '../../../../shared/services/store.service';
import { IMovie } from '../../../shared/models/movie.model';
import { FAKE_FAVORITES } from '../../../shared/const/fake-favorites.cont';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.html',
    styleUrl: './favorites.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, AsyncPipe],
})
export class FavoritesComponent implements OnInit {
    private _storeService = inject(StoreService);

    favorites: Signal<IMovie[] | undefined> = toSignal(
        this._storeService.getValueAsync('favorites'),
        {
            initialValue: [],
        },
    );

    ngOnInit(): void {
        this._storeService.setValue('favorites', FAKE_FAVORITES);
    }
}
