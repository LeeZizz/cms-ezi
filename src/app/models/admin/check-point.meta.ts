import {CrudModel} from '@app/core';
import {UserMeta} from "./user.meta";
import {BreakTimeMeta} from "./break-time.meta";
import {WorkLogMeta} from "./work-log.meta";

export class CheckPointMeta extends CrudModel {
  id: string;
  username: string;
  user: UserMeta;
  date: string;
  approved: boolean;
  check_in: string;
  ip_check_in: string;
  lat_check_in: number;
  long_check_in: number;
  check_out: string;
  ip_check_out: string;
  lat_check_out: number;
  long_check_out: number;
  distance_check_in: number;
  distance_check_out: number;
  diff_minutes_check_in: number;
  diff_minutes_check_out: number;

  break_times: BreakTimeMeta[];
  work_log_count: number;
  work_logs: WorkLogMeta[];
}
