import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, ObjectUtils, StorageUtil, TitleService, ToasterService} from '../core';
import {Auth} from '../models';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService extends AbstractCRUDService<Auth> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService, private router: Router) {
    super(http, title, toaster, 'Xác thực tài khoản', '');
    this.setNamespace("passport");
  }

  login(user: any) {
    return this.executeAction('login', user);
  }

  logOut() {
    StorageUtil.delete('user');
    this.router.navigate(['login']);
  }

  getProfile(): { name: string, photoUrl: string, username: string } {
    const user = StorageUtil.getUser();
    if (ObjectUtils.isNull(user.photoUrl)) {
      user.photoUrl = '/assets/avatar5.png';
    }
    if (ObjectUtils.isNull(user.name)) {
      user.name = 'Người dùng';
    }
    return user;
  }

  getToken(): string {
    const user = StorageUtil.getUser();
    return user ? user['token'] : null;
  }

  getRoles(): string[] {
    const user = StorageUtil.getUser();
    return user ? user['roles'] : [];
  }


}
