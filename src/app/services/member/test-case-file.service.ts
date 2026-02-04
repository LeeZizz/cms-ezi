import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {TestCaseFileMeta} from '@app/models/member';
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TestCaseFileService extends AbstractCRUDService<TestCaseFileMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý test_case_file', 'test_case_files');
    this.setNamespace('member');
  }

  downloadFile(id: string) {
    return this.http.get(`${this.apiEndpoint}/${id}/download`, {
      responseType: 'blob',
      observe: 'response',
      params: {},
    })
      .pipe(
        catchError(err => this.handleErrorRequest(err)),
      );
  }

}
