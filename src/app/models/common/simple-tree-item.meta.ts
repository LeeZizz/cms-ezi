import {CrudModel} from '@app/core';

export class SimpleTreeItemMeta extends CrudModel {
  id: string | number;
  name: string;
  value: string;
  children?: SimpleTreeItemMeta[];
}
