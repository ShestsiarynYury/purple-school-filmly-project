import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Images } from '../../images';
import { InputComponent } from '../input/input';
import { PasswordInputComponent } from '../password-input/password-input';
import { ButtonComponent } from '../button/button';
import { Icons } from '../../icons';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, PasswordInputComponent, ButtonComponent],
})
export class LayoutComponent {
    Images = Images;
    Icons = Icons;
}
