import {CrudModel} from '@app/core';

export class ProjectMemberMeta extends CrudModel {
  id: string;
  project_id: string | number;
  name: string;
}
