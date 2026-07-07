import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAVORITES } from '../../../shared/const/fake-favorites.cont';
import { CardComponent } from '../../components/card/card.component';
import { delay, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.html',
    styleUrl: './favorites.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, AsyncPipe],
})
export class FavoritesComponent {
    // favoriteMovies = input<IMovie[]>(FAVORITES);
    favoriteMovies = of(FAVORITES).pipe(delay(1000));
}
