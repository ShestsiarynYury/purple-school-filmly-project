import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-exit',
    templateUrl: './exit.component.html',
    styleUrl: './exit.component.scss',
    standalone: true,
})
export class ExitComponent {
    private _authservice = inject(AuthService);

    onLogout(): void {
        this._authservice.logout$().subscribe();
    }
}
