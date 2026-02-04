import moment from 'moment';

export class DateTimeUtil {

  static DB_DATE_FORMAT = 'YYYY-MM-DD';
  static DB_TIME_FORMAT = 'HH:mm:ss';
  static DB_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
  static CONFIG_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

  static parse(str: string) {
    const date = moment(str);
    return date.isValid() ? date.format(this.DB_DATE_TIME_FORMAT) : null;
  }

  static toString(m: moment.Moment, format: string = this.DB_DATE_TIME_FORMAT) {
    return m.format(format);
  }

  static now(format: string = this.DB_DATE_TIME_FORMAT) {
    return moment().format(format);
  }

  static today(format: string = this.DB_DATE_TIME_FORMAT) {
    return moment().format(format);
  }

  static tomorrow(format: string = this.DB_DATE_TIME_FORMAT) {
    return moment().add(1, 'days').startOf('day').format(format);
  }

  static yesterday(format: string = this.DB_DATE_FORMAT) {
    return moment().subtract(1, 'days').format(format);
  }

  static agoDays(days: number, format: string = this.DB_DATE_FORMAT) {
    return moment().subtract(days, 'days').format(format);
  }

  static startOfThisMonth(format: string = this.DB_DATE_FORMAT) {
    return moment().startOf('month').format(format);
  }

  static endOfThisMonth(format: string = this.DB_DATE_FORMAT) {
    return moment().endOf('month').format(format);
  }

  static startOfLastMonth(format: string = this.DB_DATE_FORMAT) {
    return moment().subtract(1, 'months').startOf('month').format(format);
  }

  static endOfLastMonth(format: string = this.DB_DATE_FORMAT) {
    return moment().subtract(1, 'months').endOf('month').format(format);
  }

  static toDate(str: any) {
    if (str)
      return moment(str).toDate();
    return null;
  }

}
