import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: '<app-button></app-button>',
    styleUrl: './button.scss',
    templateUrl: './button.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
    label = input.required<string>();
    disabled = input.required<boolean>();

    clickEventEmitter = output();

    onClick() {
        this.clickEventEmitter.emit();
    }
}
