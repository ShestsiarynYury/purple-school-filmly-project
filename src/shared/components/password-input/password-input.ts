import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { Icons } from '../../icons';

@Component({
    selector: '<app-password-input></app-password-input>',
    templateUrl: './password-input.html',
    styleUrl: './password-input.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {
    placeholder = input<string>('');
    disabled = input.required<boolean>();
    Icons = Icons;

    value = model<string>('');

    mode = signal<boolean>(false);

    toggleMode() {
        this.mode.update((prevMode) => !prevMode);
    }
}
