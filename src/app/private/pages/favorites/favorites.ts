import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.html',
    styleUrl: './favorites.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {}
