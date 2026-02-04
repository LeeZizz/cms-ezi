import {CrudModel} from '@app/core';
import {UserMeta} from "./user.meta";

export class ProjectMeta extends CrudModel {
  id: string;
  name: string;
  story_jira_mapping: string;
  bug_jira_mapping: string;
  task_jira_mapping: string;
  is_active: boolean;
  leader: UserMeta;
}
