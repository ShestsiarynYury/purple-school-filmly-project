import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.html',
    styleUrl: './input.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
    imports: [NgOptimizedImage],
})
export class InputComponent implements ControlValueAccessor {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onChange: (value: string) => void = (value: string) => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private onTouched: () => void = () => {};

    type = input.required<'text' | 'email'>();
    placeholder = input<string>('');
    iconUrl = input<string>('');
    iconUrlPostfix = input<string>('');

    innerValue = '';
    disabled = false;

    writeValue(value: string): void {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        this.innerValue = value;
        this.onChange(value);
        this.onTouched();
    }
}
