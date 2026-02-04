import {CrudModel} from '../core';

export class Auth extends CrudModel {
  id: number;
  name: string;
  username: string;
  photoUrl: string;
}
