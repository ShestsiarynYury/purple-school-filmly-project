import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FAKE_MOVIES } from '../../../shared/const/fake-films.const';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreService } from '../../../../shared/services/store.service';
import { IMovie } from '../../../shared/models/movie.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, AsyncPipe],
})
export class HomeComponent implements OnInit {
    private _storeService = inject(StoreService);

    movies: Signal<IMovie[] | undefined> = toSignal(this._storeService.getValueAsync('movies'), {
        initialValue: [],
    });

    ngOnInit(): void {
        this._storeService.setValue('movies', FAKE_MOVIES);
    }
}
