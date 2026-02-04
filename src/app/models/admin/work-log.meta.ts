import {CrudModel} from '@app/core';
import {BreakTimeMeta} from "./break-time.meta";

export class WorkLogMeta extends CrudModel {
  id: string;
  username: string;
  time_spent_hours: string;
  time_spent: string;
  comment: string;
  logging_at: string;
  logging_date: string;
  issue_id: string;
  worklog_id: string;
  issue: string;
  summary: string;
  resolved?: boolean;
  issue_href: string;

  break_times: BreakTimeMeta[];
}
