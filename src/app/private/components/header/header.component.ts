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
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { delay, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';
import { ExitComponent } from '../../../../shared/components/exit/exit.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavButtonComponent, RouterLink, NgOptimizedImage, ExitComponent],
})
export class HeaderComponent implements OnInit {
    private _authService = inject(AuthService);
    private _titleService = inject(Title);
    private _router = inject(Router);
    private _destroyRef = inject(DestroyRef);

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
    }
}
