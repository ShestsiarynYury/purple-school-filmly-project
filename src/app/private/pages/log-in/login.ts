import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Icons } from '../../../../shared/icons';
import { Images } from '../../../../shared/images';
import { NAV_CONST } from './constants';
import { IMenu } from '../../component/nav-button/models';
import { NavButtonComponent } from '../../component/nav-button/nav-button';

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
