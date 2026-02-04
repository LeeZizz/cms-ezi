import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, DataResponse, pathJoin, TitleService, ToasterService} from '@app/core';
import {CheckPointMeta} from '@app/models/member';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class CheckPointService extends AbstractCRUDService<CheckPointMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý check_point', 'check_points');
    this.setNamespace('member');
  }

  checkin(body: any): Observable<CheckPointMeta> {
    return this.http.post<DataResponse<CheckPointMeta>>(pathJoin([this.apiEndpoint, 'check_in']), body)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => {
        if (res.status === 2) {
          this.toastWarning("Check in", res.message);
        } else {
          this.toastSuccess("Check in", res.message);
        }
        return res['data'];
      }));
  }

}
