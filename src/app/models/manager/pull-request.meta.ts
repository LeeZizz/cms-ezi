import {CrudModel} from '@app/core';
import {ProjectTaskMeta} from "./project-task.meta";

export class PullRequestMeta extends CrudModel {
  id: string;
  task_id: string;
  task: ProjectTaskMeta;
  state: string;
  href: string;
  payload: any;
  repository: string;
}
