import {AbstractControl, ValidationErrors} from '@angular/forms';
import {pathJoin} from '../utils';

export function createEmailTagsInputValidator(control: AbstractControl): ValidationErrors | null {

  const arr = control.value;

  if (!arr) {
    return null;
  }

  const result: string[] = [];

  arr.forEach(v => {
    const email = v['displayValue'];
    if (!email || !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )) {
      result.push(email);
    }
  });

  if (result.length === 0) {
    return null;
  }

  return {msg: pathJoin(result) + ' không phải địa chỉ email'};
}
