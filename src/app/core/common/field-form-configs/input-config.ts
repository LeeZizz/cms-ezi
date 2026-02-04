import {CommonConfig} from "./common-config";

export class InputConfig extends CommonConfig {
  rows: number = 5;
  minLength: number = 0;
  maxLength: number = null;

  constructor(params?: Object) {
    super(params);
  }
}
