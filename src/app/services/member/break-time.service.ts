import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {BreakTimeMeta} from '@app/models/member';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class BreakTimeService extends AbstractCRUDService<BreakTimeMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý break_time', 'break_times');
    this.setNamespace('member');
  }

}
