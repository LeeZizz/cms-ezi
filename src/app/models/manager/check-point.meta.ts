import {CrudModel} from '@app/core';
import {ProjectMeta} from "./project.meta";
import {BreakTimeMeta} from "@app/models/admin";

export class CheckPointMeta extends CrudModel {
  id: string;
  project_id: string;
  name: string;
  deadline: string;
  tasks_count: number;
  project: ProjectMeta;
  work_log_count: number;
  break_times: BreakTimeMeta[];
}
