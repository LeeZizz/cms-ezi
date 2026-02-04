import {CrudModel} from '@app/core';
import {UserMeta} from "./user.meta";

export class PunishmentMeta extends CrudModel {
  id: string;
  reason: string;
  user: UserMeta;
  user_id: string;
  username: string;
  approved: boolean;
  date_at: string | Date;
  amount: number;
  description: string;
}

