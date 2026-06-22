import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgOptimizedImage],
})
export class RatingCompponent {
    rating = input.required<number>();
    iterabledRating = computed(() => {
        return Array.from({ length: 5 }, (value, index) => {
            return { number: index + 1, isFill: index <= this.rating() };
        });
    });
}
