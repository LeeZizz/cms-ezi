import { NbMenuItem } from '@nebular/theme';

export const CMS_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'QUẢN LÝ NỘI DUNG',
    group: true,
  },
  {
    title: 'Bài viết',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Danh sách bài viết',
        link: '/pages/content/posts',
      },
      {
        title: 'Thêm bài viết mới',
        link: '/pages/content/new-post',
      },
    ],
  },
  {
    title: 'Cấu hình hệ thống',
    icon: 'settings-2-outline',
    link: '/pages/settings',
  },
];
