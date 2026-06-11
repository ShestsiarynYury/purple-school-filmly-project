import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrl: './home.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
