import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button';
import { InputComponent } from '../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input';
import { Icons } from '../../../shared/icons';
import { Images } from '../../../shared/images';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.html',
    styleUrl: './layout.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, PasswordInputComponent, ButtonComponent],
})
export class PublicLayoutComponent {
    Images = Images;
    Icons = Icons;
}
