import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { NavButtonComponent } from '../nav-button/nav-button';
import { NAV_CONST } from '../../constants';
import { IMenu } from '../nav-button/models';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { delay, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavButtonComponent, RouterLink, NgOptimizedImage],
})
export class HeaderComponent implements OnInit {
    private _authService = inject(AuthService);
    private _titleService = inject(Title);
    private _router = inject(Router);
    private _destroyRef = inject(DestroyRef);
    private _activatedRoute = inject(ActivatedRoute);
    private _authservice = inject(AuthService);

    title = signal<string>('');

    navLinks: IMenu[] = NAV_CONST;

    ngOnInit(): void {
        this._router.events
            .pipe(
                delay(100),
                tap((event) => {
                    if (event instanceof NavigationEnd) {
                        this.title.set(this._titleService.getTitle());
                    }
                }),
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe();

        this._authService.isAuthenticated$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((isAuth) => {
                if (!isAuth) {
                    this._router.navigate(['/paublic']);
                }
            });
    }

    onLogout(): void {
        this._authservice.logout$().subscribe();
    }
}
