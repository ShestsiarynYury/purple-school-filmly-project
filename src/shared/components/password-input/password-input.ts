import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { Icons } from '../../icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.html',
    styleUrl: './password-input.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true,
        },
    ],
    imports: [NgOptimizedImage],
})
export class PasswordInputComponent implements ControlValueAccessor {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onChange: (value: string) => void = (value: string) => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onTouch: () => void = () => {};

    placeholder = input<string>('');
    mode = signal<boolean>(false);

    Icons = Icons;
    innerValue = '';
    disabled = false;

    toggleMode() {
        this.mode.update((prevMode) => !prevMode);
    }

    writeValue(value: string): void {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this._onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        this.innerValue = value;
        this._onChange(value);
        this._onTouch();
    }
}
