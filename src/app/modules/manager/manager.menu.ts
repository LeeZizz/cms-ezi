import {NbMenuItem} from "@nebular/theme";
import {NbIconConfigUtils} from "@app/core";

export const MANAGER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trình quản lý',
    icon: 'checkmark-square',
    children: [
      {
        title: 'Dự án',
        icon: 'file-text',
        link: '/manager/project',
      },
      {
        title: 'Pull request',
        icon: 'file-text',
        link: '/manager/pull-request',
      },
    ],
  },
];
