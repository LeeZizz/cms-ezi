import {CrudModel} from '@app/core';
import {ProjectTicketMeta} from "./project-ticket.meta";

export class ProjectTaskMeta extends CrudModel {
  id: string;
  project_id: string;
  ticket_id: string;
  title: string;
  deadline: string;
  assignee_id: string;
  assignee: string;
  status: string;
  task_jira_mapping: string;
  ticket: ProjectTicketMeta;
}
