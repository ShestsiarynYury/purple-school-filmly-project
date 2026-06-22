import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IMovie } from '../../../shared/models/movie.model';
import { NgOptimizedImage } from '@angular/common';
import { RatingCompponent } from '../rating/rating.component';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage, RatingCompponent],
})
export class CardComponent {
    card = input<IMovie | null>(null);
}
