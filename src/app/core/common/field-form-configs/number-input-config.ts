import {CommonConfig} from "./common-config";

export class NumberInputConfig extends CommonConfig {
  isCurrency: boolean = false;
  maxValue: number = null;
  minValue: number = null;
  step: number = 0;

  constructor(params?: Object) {
    super(params);
  }

}
