import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icons } from '../../../../shared/icons';
import { Images } from '../../../../shared/images';
import { InputComponent } from '../../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { take, tap, catchError, of } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrl: './login.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, PasswordInputComponent, ButtonComponent],
})
export class LogInComponent {
    private _authService = inject(AuthService);
    private _formValue: { username: string | null; password: string | null } = {
        username: null,
        password: null,
    };
    private _router: Router = inject(Router);

    error = '';
    Images = Images;
    Icons = Icons;

    onInputChange(control: 'username' | 'password', value: string) {
        this._formValue[control] = value;
    }

    onLoginClick(): void {
        if (this._formValue.username == null || this._formValue.password == null) {
            return;
        }

        this._authService
            .login$(this._formValue.username, this._formValue.password)
            .pipe(
                take(1),
                tap(() => this._router.navigate(['private'])),
                catchError((_error) => {
                    this.error = _error;

                    return of(_error);
                }),
            )
            .subscribe();
    }
}
