import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icons } from '../../../../shared/icons';
import { Images } from '../../../../shared/images';
import { InputComponent } from '../../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrl: './login.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, PasswordInputComponent, ButtonComponent],
})
export class LogInComponent {
    Images = Images;
    Icons = Icons;
}
