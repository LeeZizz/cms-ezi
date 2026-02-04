import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {ProjectTaskMeta} from "@app/models/manager";

@Injectable({providedIn: 'root'})
export class ProjectTaskService extends AbstractCRUDService<ProjectTaskMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý project_task', 'project_tasks');
    this.setNamespace('manager');
  }

}
