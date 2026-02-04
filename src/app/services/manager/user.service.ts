import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {UserMeta} from '@app/models/manager';

@Injectable({providedIn: 'root'})
export class UserService extends AbstractCRUDService<UserMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý user', 'users');
    this.setNamespace('manager');
  }

}
