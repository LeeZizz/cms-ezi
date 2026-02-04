import {CrudModel} from '@app/core';

export class UserMeta extends CrudModel {
  name: string;
  username: string;
  is_active: boolean;

}
