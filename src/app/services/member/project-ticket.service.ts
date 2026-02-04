import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {ProjectTicketMeta} from "@app/models/manager";

@Injectable({providedIn: 'root'})
export class ProjectTicketService extends AbstractCRUDService<ProjectTicketMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý project_ticket', 'project_tickets');
    this.setNamespace('member');
  }

}
