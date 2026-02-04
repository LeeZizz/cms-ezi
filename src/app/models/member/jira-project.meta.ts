import {CrudModel} from '@app/core';

export class JiraProjectMeta extends CrudModel {
  id: string;
  key: string;
  name: string;
}
