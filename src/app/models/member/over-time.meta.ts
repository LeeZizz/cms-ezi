import {CrudModel} from '@app/core';
import {ProjectTaskMeta} from "./project-task.meta";

export class OverTimeMeta extends CrudModel {
  id: string;
  reason: string;
  approved: boolean;
  date_at: string;
  start_time_at: string;
  end_time_at: string;

  tasks: ProjectTaskMeta[];
  check_in: string;
  check_out: string;
}
