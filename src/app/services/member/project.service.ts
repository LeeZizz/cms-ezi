import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {ProjectMeta} from '@app/models/member';

@Injectable({providedIn: 'root'})
export class ProjectService extends AbstractCRUDService<ProjectMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý project', 'projects');
    this.setNamespace('member');
  }

}
