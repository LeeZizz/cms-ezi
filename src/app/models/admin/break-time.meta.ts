import {CrudModel} from '@app/core';
import {UserMeta} from "./user.meta";

export class BreakTimeMeta extends CrudModel {
  id: string;
  reason: string;
  user: UserMeta;
  approved: boolean;
  date_at: string;
  start_time_at: string;
  end_time_at: string;
}
