import {CrudModel} from '@app/core';
import {ProjectMeta} from "./project.meta";

export class ProjectTicketMeta extends CrudModel {
  id: string;
  project_id: string;
  name: string;
  deadline: string;
  tasks_count: number;
  project: ProjectMeta;
}
