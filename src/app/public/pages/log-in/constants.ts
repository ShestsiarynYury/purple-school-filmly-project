import { IMenu } from '../../../private/component/nav-button/models';

export const NAV_CONST: IMenu[] = [
    {
        text: 'Главная',
        iconUrl: '/icons/nav-home.svg',
        iconUrlActive: 'menu/dashboard-active.svg',
        url: 'private/home',
        id: 0,
    },
    {
        text: 'Избранное',
        iconUrl: '/icons/nav-start.svg',
        iconUrlActive: 'menu/wallet-active.svg',
        url: '/private/favorites',
        id: 1,
    },
];
