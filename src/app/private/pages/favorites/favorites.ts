import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { FAVORITES } from '../../../shared/const/fake-favorites.cont';
import { CardComponent } from '../../components/card/card.component';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.html',
    styleUrl: './favorites.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent],
})
export class FavoritesComponent {
    favoriteMovies = input<IMovie[]>(FAVORITES);
}
