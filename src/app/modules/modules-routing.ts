import {Routes} from "@angular/router";

export const MODULES_ROUTES: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin').then(m => m.AdminModule),
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager').then(m => m.ManagerModule),
  },
  {
    path: 'member',
    loadChildren: () => import('./member').then(m => m.MemberModule),
  },
];
