import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {AppConfigMeta} from '@app/models/admin';

@Injectable({providedIn: 'root'})
export class AppConfigService extends AbstractCRUDService<AppConfigMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý app_config', 'app_configs');
  }

}
