import { IMenu } from './components/nav-button/models';

export const NAV_CONST: IMenu[] = [
    {
        text: 'Главная',
        iconUrl: '/icons/nav-home.svg',
        iconUrlActive: 'menu/dashboard-active.svg',
        url: 'phome',
        id: 0,
    },
    {
        text: 'Избранное',
        iconUrl: '/icons/nav-start.svg',
        iconUrlActive: 'menu/wallet-active.svg',
        url: 'favorites',
        id: 1,
    },
];
