import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {CommonConfig, FieldForm} from '../../common';
import {ObjectUtils, StringUtils} from "../../utils";
import {DropdownSettings} from "angular2-multiselect-dropdown/lib/multiselect.interface";

@Component({
  selector: 'd-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css'],
})
export class CrudFormComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  fields: FieldForm[];

  messageErrors: { [key: string]: string } = {
    "required": "Bắt buộc",
    "code": "Không đúng định dạng",
    "another": "Không hợp lệ",
  };
  formGroupId: string = StringUtils.random(16);

  constructor() {
  }

  ngOnInit() {
  }

  onCheckboxChange(formName: string, $event: any) {
    this.formGroup.controls[formName].setValue(!!$event.target.checked);
  }

  getValue(formName: string) {
    return this.formGroup.controls[formName].value;
  }

  getFieldIndexByName(fieldName: string) {
    const index = this.fields.map(f => f.formControl).indexOf(fieldName);
    if (index < 0) {
      throw new Error('insertField: Không có form control có tên như vậy');
    }
    return index;
  }

  getConfigField(f: FieldForm, configName: string, defaultValue: any = null) {
    if (f.config && f.config.hasOwnProperty(configName)) {
      return f.config[configName];
    }
    return defaultValue;
  }

  getErrors(f: FieldForm) {
    if (this.hasErrors(f)) {
      const errors: ValidationErrors = this.formGroup.controls[f.formControl].errors;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          if (this.messageErrors.hasOwnProperty(key)) {
            return `${this.messageErrors[key]}`;
          } else {
            return `${this.messageErrors["another"]}`;
          }
        }
      }
    } else {
      return null;
    }
  }


  onHtmlEditorChange(formControl: string, $event: any) {
    this.formGroup.controls[formControl].setValue($event);
  }

  hasErrors(f: FieldForm) {
    return this.formGroup && this.formGroup.controls[f.formControl]
      && this.formGroup.controls[f.formControl].touched && this.formGroup.controls[f.formControl].invalid;
  }

  getElementId(f: FieldForm) {
    return `${this.formGroupId}_${f.formControl}`;
  }

  getDropdownSetting(config: CommonConfig) {
    return ObjectUtils.clone(config) as DropdownSettings;
  }

}
