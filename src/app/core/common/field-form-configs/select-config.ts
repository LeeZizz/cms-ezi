import {CommonConfig} from "./common-config";

export class SelectConfig extends CommonConfig {
  labelKey: string = 'name';
  primaryKey: string = 'id';


  constructor(params?: Object) {
    super(params);
  }

  static from(label: string, primary: string): SelectConfig {
    const config = new SelectConfig();
    config.labelKey = label;
    config.primaryKey = primary;
    return config;
  }

}

