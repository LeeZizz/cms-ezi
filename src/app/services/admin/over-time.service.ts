import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {OverTimeMeta} from '@app/models/admin';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class OverTimeService extends AbstractCRUDService<OverTimeMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý over_time', 'over_time_points');
  }

}
