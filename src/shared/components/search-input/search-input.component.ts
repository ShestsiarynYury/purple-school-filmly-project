import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrl: './search-input.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchInputComponent),
            multi: true,
        },
    ],
    imports: [NgOptimizedImage],
})
export class SearchInputComponent implements ControlValueAccessor {
    private _innerValue = '';
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onChange: (value: string) => void = (value: string) => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onTouched: () => void = () => {};

    disabled = false;

    type = input<'text' | 'email'>('text');
    placeholder = input<string>('');
    iconUrl = input<string>('/icons/search.svg');

    inputEvent = output<string>();

    writeValue(value: string): void {
        this._innerValue = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        this._innerValue = value;
        this._onChange(value);
        this._onTouched();
    }
}
