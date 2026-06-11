import { INavConst } from '../../../../shared/components/nav-button/models';

export const NAV_CONST: INavConst[] = [
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
