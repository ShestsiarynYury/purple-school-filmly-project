import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
    type = input<'text' | 'email'>('text');
    placeholder = input<string>('');
    disabled = input<boolean>(false);
    iconUrl = input<string>('/icons/search.svg');

    value = input<string>('');
    inputEvent = output<string>();

    onInput(input: string) {
        console.log(input);
        this.inputEvent.emit(input);
    }
}
