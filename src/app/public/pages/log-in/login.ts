import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Icons } from '../../../../shared/icons';
import { Images } from '../../../../shared/images';
import { NAV_CONST } from './constants';
import { NavButtonComponent } from '../../../private/components/nav-button/nav-button';
import { IMenu } from '../../../private/components/nav-button/models';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrl: './login.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, NavButtonComponent, RouterLink],
})
export class LogInComponent {
    Images = Images;
    Icons = Icons;

    navLinks: IMenu[] = NAV_CONST;
}
