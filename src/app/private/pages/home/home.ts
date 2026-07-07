import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// import { IMovie } from '../../../shared/models/movie.model';
import { CardComponent } from '../../components/card/card.component';
import { MOVIES } from '../../../shared/const/fake-films.const';
import { delay, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, AsyncPipe],
})
export class HomeComponent {
    // movies = input<IMovie[]>(MOVIES);
    movies = of(MOVIES).pipe(delay(1000));
}
