import {CrudModel} from '@app/core';
import {MemberInformationMeta} from "./member-information.meta";

export class UserMeta extends CrudModel {
  name: string;
  username: string;
  is_active: boolean;

  information: MemberInformationMeta;
}
