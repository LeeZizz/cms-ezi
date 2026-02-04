import {NbMenuItem} from "@nebular/theme";
import {NbIconConfigUtils} from "@app/core";

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Quản trị viên',
    icon: 'lock',
    children: [
      {
        title: 'Cấu hình',
        icon: 'settings-outline',
        link: '/admin/app-config',
      },
      {
        title: 'Quyền truy cập',
        icon: 'code-outline',
        link: '/admin/role',
      },
      {
        title: 'Tài khoản',
        icon: 'people',
        link: '/admin/user',
      },
      {
        title: 'Xin nghỉ',
        icon: 'calendar',
        link: '/admin/break-time',
      },
      {
        title: 'Đăng ký OT',
        icon: 'clock',
        link: '/admin/over-time',
      },
      {
        title: 'Dự án',
        icon: 'file-text',
        link: '/admin/project',
      },
      {
        title: 'Danh sách work log',
        icon: 'file-text',
        link: '/admin/work-log',
      },
      {
        title: 'Chấm công',
        icon: 'file-text',
        link: '/admin/check-point',
      },
      {
        title: 'Phiếu phạt',
        icon: 'alert-triangle',
        link: '/admin/punishment',
      },
    ],
  },
];
