import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {TestCaseMeta} from '@app/models/member';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class TestCaseService extends AbstractCRUDService<TestCaseMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý test_case', 'test_cases');
    this.setNamespace('member');
  }

}
