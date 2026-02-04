import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToasterService} from '@app/core';
import {AbstractCRUDService} from '@app/core';
import {TitleService} from '@app/core';

@Injectable({providedIn: 'root'})
export class DashboardService extends AbstractCRUDService<any> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Bảng điều khiển', 'dashboard');
  }

}
