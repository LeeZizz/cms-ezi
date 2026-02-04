import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "@app/services";

@Injectable()
export class GuardService {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Tạm thời cho phép truy cập tất cả để xem giao diện không cần BE
    return true;
    /*
    const router = inject(Router);
    const authService = inject(AuthService);
    const token = authService.getToken();
    if (token) {
      return true;
    }
    router.navigateByUrl('login');
    return false;
    */
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

}
