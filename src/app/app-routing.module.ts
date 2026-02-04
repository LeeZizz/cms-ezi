import {ActivatedRouteSnapshot, ExtraOptions, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {inject, NgModule} from '@angular/core';
import {GuardService} from './core';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./main_pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () => import('./main_pages/home/home.module').then(m => m.HomeModule),
    canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(GuardService).canActivate(next, state)],
    canActivateChild: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(GuardService).canActivateChild(next, state)],
  },
  {path: '**', redirectTo: ''},
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
