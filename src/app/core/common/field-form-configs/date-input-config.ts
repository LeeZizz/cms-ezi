import {CommonConfig} from "./common-config";
import moment from "moment";

export class DateInputConfig extends CommonConfig {
  minValue: any;
  maxValue: any;
  step: number;

  constructor(params?: Object) {
    super(params || {});
  }

  static defaultDateTime() {
    return new DateInputConfig().setMinValue(moment().set('y', 1970).startOf('y').toDate());
  }

  static defaultDatePicker() {
    return new DateInputConfig().setMinValue(moment().set('y', 1970).startOf('y').toDate());
  }

  static defaultTimePicker(step: number = 30) {
    return new DateInputConfig().setStep(step);
  }

  setStep(step: number) {
    return this.set('step', step);
  }

  setMinValue(minValue: any) {
    return this.set('minValue', minValue);
  }

  setMaxValue(maxValue: any) {
    return this.set('maxValue', maxValue);
  }
}
