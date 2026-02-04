import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ToasterService} from '@app/core';
import {AbstractCRUDService} from '@app/core';
import {TitleService} from '@app/core';

@Injectable({providedIn: 'root'})
export class ProfileService extends AbstractCRUDService<any> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Thông tin cá nhân', 'profile');
  }

}
