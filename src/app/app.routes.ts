import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout';
import { PrivateLayoutComponent } from './private/_layout/layout';
import { LogInComponent } from './private/pages/login/login';
import { FavoritesComponent } from './private/pages/favorites/favorites';
import { HomeComponent } from './private/pages/home/home';
import { authGuard } from '../shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'public',
        component: PublicLayoutComponent,
        children: [
            {
                path: 'log-in',
                component: LogInComponent,
            },
            {
                path: '**',
                redirectTo: 'log-in',
            },
        ],
    },
    {
        path: 'private',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'favorites',
                component: FavoritesComponent,
            },
            {
                path: '**',
                redirectTo: 'home',
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'public',
    },
];
