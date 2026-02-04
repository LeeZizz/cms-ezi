import {AbstractControl, ValidationErrors} from '@angular/forms';
import {DateTimeUtil} from '../utils';
import moment from 'moment';

export class CustomValidator {

  static validateUrl(control: AbstractControl) {
    if (control.value) {
      if (control.value.startsWith('http://') || control.value.startsWith('https://')) {
        return null;
      }
    }
    return {url: true};
  }

  static validateArray(control: AbstractControl) {
    const value: any[] = control.value;
    if (value && value.length) {
      return null;
    }
    return {array: true};
  }

  static validateIdNumber(control: AbstractControl) {
    const value: string = control.value;
    if (/^\d{9}$/.test(value)) {
      return null;
    }
    if (/^\d{12}$/.test(value)) {
      return null;
    }
    return {idNumber: true};
  }

  static validatePhoneNumber(control: AbstractControl) {
    const value: string = control.value;
    if (/^\d{10}$/.test(value) && value.startsWith('0')) {
      return null;
    }
    return {phoneNumber: true};
  }

  static validateTaxCode(control: AbstractControl) {
    const value: string = control.value;
    if (CustomValidator.checkByPattern(control, /^\d{10}$/)) {
      return null;
    }
    if (this.checkByPattern(control, /\d{10}-\d{3}$/)) {
      return null;
    }
    return {taxCode: true};
  }

  static validateVietnamese(control: AbstractControl) {
    if (CustomValidator.checkByPattern(control, /^[\w ÁÀẢÃẠáàảãạÂẤẦẨẪẬâấầẩẫậĂẮẰẲẴẶăắằẳẵặĐđÉÈẺẼẸéèẻẽẹÊẾỀỂỄỆêếềểễệÓÒỎÕỌóòỏõọÔỐỒỔỖỘôốồổỗộƠỚỜỞỠỢơớờởỡợÍÌỈĨỊíìỉĩịÚÙỦŨỤúùủũụƯỨỪỬỮỰưứừửữựÝỲỶỸỴýỳỷỹỵ]+$/u)) {
      return null; // Validation passes
    } else {
      return {vietnamese: true}; // Validation fails
    }
  }

  static validateCode(control: AbstractControl) {
    if (CustomValidator.checkByPattern(control, /^[A-Za-z0-9_\-]+$/)) {
      return null; // Validation passes
    } else {
      return {
        code: true,
      }; // Validation fails
    }
  }

  static validateSlug(control: AbstractControl) {
    if (CustomValidator.checkByPattern(control, /^[A-Za-z0-9_\-\.]+$/)) {
      return null; // Validation passes
    } else {
      return {
        code: true,
      }; // Validation fails
    }
  }

  private static checkByPattern(control: AbstractControl, pattern: RegExp) {
    const value = control.value as string;
    return pattern.test(value);
  }

  static minDateTime(dateTime: string, format: string = DateTimeUtil.DB_DATE_TIME_FORMAT) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null) {
        return null;
      }

      const controlDate = moment(control.value, format);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(dateTime);

      return controlDate.isAfter(validationDate) ? null : {
        minDateTime: {
          'datetime-min': validationDate.format(format),
          'actual': controlDate.format(format),
        },
      };
    };
  }

  static maxDateTime(dateTime: string, format: string = DateTimeUtil.DB_DATE_TIME_FORMAT) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null) {
        return null;
      }

      const controlDate = moment(control.value, format);

      if (!controlDate.isValid()) {
        return null;
      }

      const validationDate = moment(dateTime);

      return controlDate.isBefore(validationDate) ? null : {
        minDateTime: {
          'datetime-min': validationDate.format(format),
          'actual': controlDate.format(format),
        },
      };
    };
  }
}
