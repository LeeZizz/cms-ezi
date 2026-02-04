import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {JiraProjectMeta} from '@app/models/member';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class JiraProjectService extends AbstractCRUDService<JiraProjectMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý jira_project', 'jira_projects');
  }

}
