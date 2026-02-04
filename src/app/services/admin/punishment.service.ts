import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractCRUDService, TitleService, ToasterService} from '@app/core';
import {PunishmentMeta} from '@app/models/admin';

@Injectable({providedIn: 'root'})
export class PunishmentService extends AbstractCRUDService<PunishmentMeta> {

  constructor(http: HttpClient, toaster: ToasterService, title: TitleService) {
    super(http, title, toaster, 'Quản lý punishment', 'punishments');
  }

}
