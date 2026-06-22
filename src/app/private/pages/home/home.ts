import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { CardComponent } from '../../components/card/card.component';
import { MOVIES } from '../../../shared/const/fake-films.const';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent],
})
export class HomeComponent {
    movies = input<IMovie[]>(MOVIES);
}
