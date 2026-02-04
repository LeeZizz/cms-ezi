import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {UserMeta} from '@app/models/admin';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService extends AbstractCRUDService<UserMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý user', 'users');
  }

}
