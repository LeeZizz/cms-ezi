import {CrudModel} from '@app/core';
import {ProjectMeta, ProjectTaskMeta, ProjectTicketMeta} from "@app/models/member";

export class TestCaseFileMeta extends CrudModel {
  id: string;
  reporter: string;
  assignee: boolean;
  file: string;
  bug_count: number;

  ticket: ProjectTicketMeta;
  project: ProjectMeta;
  task: ProjectTaskMeta;
  result: string;
  title: string;
  task_id: string;
}
