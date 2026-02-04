import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {PullRequestMeta} from "@app/models/manager";

@Injectable({providedIn: 'root'})
export class PullRequestService extends AbstractCRUDService<PullRequestMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý pull_request', 'pull_requests');
    this.setNamespace('manager');
  }

}
