import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {CheckPointMeta} from '@app/models/admin';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CheckPointService extends AbstractCRUDService<CheckPointMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý check_point', 'check_points');
  }

}
