import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '../../../shared/icons';
import { Images } from '../../../shared/images';
import { GENRES, IGenre } from '../../shared/const/genres.const';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, HeaderComponent],
})
export class PrivateLayoutComponent {
    Images = Images;
    Icons = Icons;

    genres: IGenre[] = GENRES;
}
