import {CrudModel} from '@app/core';
import {ProjectMeta} from "./project.meta";
import {ProjectTicketMeta} from "@app/models/manager";

export class ProjectTaskMeta extends CrudModel {
  id: string;
  title: string;
  status: string;

  project: ProjectMeta;
  ticket: ProjectTicketMeta;
  assignee: string;
}
