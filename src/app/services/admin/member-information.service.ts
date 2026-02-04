import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {MemberInformationMeta} from '@app/models/admin';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class MemberInformationService extends AbstractCRUDService<MemberInformationMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý member_information', 'member_information');
  }

}
