import {CrudModel} from '@app/core';

export class WorkLogMeta extends CrudModel {
  id: string;
  username: string;
  time_spent_hours: number;
  time_spent: string;
  comment: string;
  logging_at: string;
  logging_date: string;
  issue_id: string;
  worklog_id: string;
  issue: string;
  summary: string;
  work_log_count: number;
}
