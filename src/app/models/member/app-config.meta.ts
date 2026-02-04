import {CrudModel} from '@app/core';

export class AppConfigMeta extends CrudModel {
  id: string;
  name: string;
  display_name: string;
  value: string;
}
