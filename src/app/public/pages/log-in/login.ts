import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class LogInComponent implements OnInit {
    private _authService = inject(AuthService);
    private _router: Router = inject(Router);
    private destroyRef = inject(DestroyRef);
    Images = Images;
    Icons = Icons;
    error = null;
    form = new FormGroup({
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { validators: [Validators.required, noSpaceValidator()] }),
    });
    invalid = signal<boolean>(true);

    ngOnInit(): void {
        this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

        this.form.statusChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((status) => {
            if (status === 'INVALID') {
                this.invalid.set(true);
            }

            if (status === 'VALID') {
                this.invalid.set(false);
            }
        });
    }

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
}
