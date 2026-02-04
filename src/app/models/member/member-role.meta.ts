import {CrudModel} from '@app/core';

export class MemberRoleMeta extends CrudModel {
  id: string;
  user_id: string | number;
  name: string;
}
