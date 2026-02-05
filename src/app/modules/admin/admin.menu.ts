import { NbMenuItem } from "@nebular/theme";
import { NbIconConfigUtils } from "@app/core";

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Quản lý danh mục dự án',
    icon: 'grid-outline',
    children: [
      {
        title: 'Danh mục thuê',
        icon: 'home-outline',
        link: '/admin/project-category/rent',
      },
      {
        title: 'Danh mục bán',
        icon: 'shopping-cart-outline',
        link: '/admin/project-category/sale',
      },
    ],
  },
];


