import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Icons } from '../../../shared/icons';
import { Images } from '../../../shared/images';
import { IMenu } from '../components/nav-button/models';
import { NAV_CONST } from '../constants';
import { NavButtonComponent } from '../components/nav-button/nav-button';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, NavButtonComponent, RouterLink],
})
export class PrivateLayoutComponent {
    Images = Images;
    Icons = Icons;

    navLinks: IMenu[] = NAV_CONST;
}
