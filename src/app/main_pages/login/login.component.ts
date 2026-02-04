import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StorageUtil} from '@app/core';
import {NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {AuthService} from "@app/services";


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  private profile: { name: string; photoUrl: string; roles: string[]; username: string };

  constructor(service: NbAuthService, cd: ChangeDetectorRef, router: Router,
              private authService: AuthService) {
    super(service, {}, cd, router);

  }

  async ngOnInit() {
    await this.check_login();
  }

  async check_login() {
    const token: string = this.authService.getToken();
    if (!!token) {
      await this.check_role();
    }
  }

  login(): void {
    this.authService.login({
      username: this.user.email,
      password: this.user.password,
    }).subscribe(async value => {
      StorageUtil.setUser(value);
      const roles = value['roles'];
      await this.router.navigate([roles[0]]);
    });
  }

  async check_role() {
    const roles: string[] = this.authService.getRoles();
    if (!roles) {
      this.authService.logOut();
    } else {
      this.router.navigate([roles[0]]);
    }
  }

}
