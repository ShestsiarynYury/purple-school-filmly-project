import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

@Component({
    selector: '<app-input></app-input>',
    templateUrl: './input.html',
    styleUrl: './input.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
    type = input.required<'text' | 'email'>();
    placeholder = input<string>('');
    disabled = input.required<boolean>();
    iconUrl = input<string | null>(null);

    inputEvent = output<string>();

    value = model<string>('');

    onInput(input: string) {
        this.inputEvent.emit(input);
    }
}
