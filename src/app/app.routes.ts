import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './public/_layout/layout';
import { PrivateLayoutComponent } from './private/_layout/layout';
import { FavoritesComponent } from './private/pages/favorites/favorites';
import { HomeComponent } from './private/pages/home/home';
import { authGuard } from '../shared/guards/auth.guard';
import { LogInComponent } from './public/pages/log-in/login';

export const routes: Routes = [
    {
        path: 'public',
        component: PublicLayoutComponent,
        children: [
            {
                path: 'log-in',
                component: LogInComponent,
                title: 'Авторизация',
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
                title: 'Главная',
            },
            {
                path: 'favorites',
                component: FavoritesComponent,
                title: 'Избранное',
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
