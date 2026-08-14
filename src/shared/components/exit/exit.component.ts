import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-exit',
    templateUrl: './exit.component.html',
    styleUrl: './exit.component.scss',
    standalone: true,
})
export class ExitComponent {
    private _authservice = inject(AuthService);
    private _router = inject(Router);

    onLogout(): void {
        this._authservice.logout$().subscribe(() => {
            this._router.navigate(['/public']);
        });
    }
}
