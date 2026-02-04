import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {WorkLogMeta} from '@app/models/admin';

@Injectable({providedIn: 'root'})
export class WorkLogService extends AbstractCRUDService<WorkLogMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý work_log', 'work_logs');
  }

}
