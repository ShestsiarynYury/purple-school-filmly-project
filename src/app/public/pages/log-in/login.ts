import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icons } from '../../../../shared/icons';
import { Images } from '../../../../shared/images';
import { InputComponent } from '../../../../shared/components/input/input';
import { PasswordInputComponent } from '../../../../shared/components/password-input/password-input';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { take, tap, catchError, of } from 'rxjs';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { noSpaceValidator } from '../../../../shared/validators/no-space.validator';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrl: './login.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        InputComponent,
        PasswordInputComponent,
        ButtonComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class LogInComponent {
    private _authService = inject(AuthService);
    private _router: Router = inject(Router);

    error = '';
    Images = Images;
    Icons = Icons;

    onLoginClick(): void {
        if (this.form.controls.email.value == null || this.form.controls.password.value == null) {
            return;
        }

        this._authService
            .login$(this.form.controls.email.value, this.form.controls.password.value)
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

    form = new FormGroup({
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { validators: [Validators.required, noSpaceValidator()] }),
    });
}
