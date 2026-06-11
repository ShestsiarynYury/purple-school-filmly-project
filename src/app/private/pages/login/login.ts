import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { INavConst } from '../../../../shared/components/nav-button/models';
import { NavButtonComponent } from '../../../../shared/components/nav-button/nav-button';
import { Icons } from '../../../../shared/icons';
import { Images } from '../../../../shared/images';
import { NAV_CONST } from './constants';

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

    navLinks: INavConst[] = NAV_CONST;
}
