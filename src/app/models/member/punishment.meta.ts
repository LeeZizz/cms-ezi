import {CrudModel} from '@app/core';

export class PunishmentMeta extends CrudModel {
  id: string;
  reason: string;
  description: string;
  date_at: string;
  amount: number;
  approved?: boolean;
}
