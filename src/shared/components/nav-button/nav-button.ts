import { NgOptimizedImage, NgClass } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	input,
	OnDestroy,
	output,
} from '@angular/core';

@Component({
	selector: 'app-nav-button',
	templateUrl: './nav-button.html',
	styleUrl: './nav-button.scss',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgOptimizedImage, NgClass],
})
export class NavButtonComponent implements AfterViewInit, OnDestroy {
	private _elementRef: ElementRef = inject(ElementRef);
	private _observer!: MutationObserver;

	type = 'button';
	isActive = false;

	text = input<string>('');
	iconUrl = input<string>();
	iconUrlActive = input<string>();
	disabled = input<boolean>(false);

	clickEvent = output<Event>();

	ngAfterViewInit(): void {
		this._observer = new MutationObserver(() => {
			this.isActive = this._elementRef.nativeElement.classList.contains('active');
		});

		this._observer.observe(this._elementRef.nativeElement, {
			attributes: true,
			attributeFilter: ['class'],
		});
	}

	ngOnDestroy(): void {
		this._observer?.disconnect();
	}

	onClick(event: Event): void {
		if (!this.disabled()) {
			this.clickEvent.emit(event);
		}
	}
}
