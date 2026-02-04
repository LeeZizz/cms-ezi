import {CrudModel} from '@app/core';

export class CheckPointMeta extends CrudModel {
  id: string;
  date: string;
  month: number;
  year: number;
  check_in: string;
  check_out: string;
  approved: boolean;
  work_log_count: number;
}
