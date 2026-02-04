import {NbMenuItem} from "@nebular/theme";

export const MEMBER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Chấm công',
    icon: 'calendar',
    link: '/member/check-point',
  },
  {
    title: 'Xin nghỉ',
    icon: 'calendar',
    link: '/member/break-time',
  },
  {
    title: 'Đăng ký OT',
    icon: 'clock',
    link: '/member/over-time',
  },
  {
    title: 'Việc được giao',
    icon: 'file-text',
    link: '/member/project-task',
  },
  {
    title: 'Log bug',
    icon: 'file-text',
    link: '/member/test-case-file',
  },
  {
    title: 'Phiếu phạt',
    icon: 'alert-triangle',
    link: '/member/punishment',
  },
];
