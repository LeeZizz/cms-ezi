import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {MemberInformationMeta} from '@app/models/member';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class MemberInformationService extends AbstractCRUDService<MemberInformationMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Thông tin cá nhân', 'member_information');
    this.setNamespace('member');
  }

}
