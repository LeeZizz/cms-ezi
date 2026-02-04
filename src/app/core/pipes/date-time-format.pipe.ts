import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';
import {DateTimeUtil} from '../utils';

@Pipe({name: 'dateTimeFormat'})
export class DateTimeFormatPipe implements PipeTransform {
  constructor() {
  }

  transform(value: string) {
    const dateTime = moment(value).format(DateTimeUtil.DB_DATE_TIME_FORMAT);
    return moment(value).format(DateTimeUtil.DB_DATE_TIME_FORMAT);
  }
}
