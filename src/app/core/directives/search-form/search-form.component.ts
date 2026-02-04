import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {CommonConfig, FieldForm} from '../../common';
import {ObjectUtils, StringUtils} from "../../utils";
import {DropdownSettings} from "angular2-multiselect-dropdown/lib/multiselect.interface";

@Component({
  selector: 'd-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {

  @Input()
  searchForm: FormGroup;

  @Output() action: EventEmitter<any> = new EventEmitter();

  @Input()
  searchControls: FieldForm[];

  stubFormValue: any;

  formGroupId: string = StringUtils.random(16);

  constructor() {
  }

  ngOnInit() {
    this.stubFormValue = this.searchForm.getRawValue();
  }

  removeFilter() {
    this.searchForm.reset(this.stubFormValue);
  }

  search() {
    this.action.emit();
  }

  onCheckboxChange(formName: string, $event: any) {
    this.searchForm.controls[formName].setValue($event.target.checked ? 1 : 0);
  }

  getFormValue(formName: string) {
    return this.searchForm.controls[formName].value;
  }

  getDropdownSetting(config: CommonConfig) {
    return ObjectUtils.clone(config) as DropdownSettings;
  }

  getElementId(f: FieldForm) {
    return `${this.formGroupId}_${f.formControl}`;
  }

  hasErrors(f: FieldForm) {
    return this.searchForm && this.searchForm.controls[f.formControl]
      && this.searchForm.controls[f.formControl].touched && this.searchForm.controls[f.formControl].invalid;
  }

  getConfigField(f: FieldForm, configName: string, defaultValue: any = null) {
    if (f.config && f.config.hasOwnProperty(configName)) {
      return f.config[configName];
    }
    return defaultValue;
  }

  getErrors(f: FieldForm) {
    if (this.hasErrors(f)) {
      const errors: ValidationErrors = this.searchForm.controls[f.formControl].errors;
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

  messageErrors: { [key: string]: string } = {
    "required": "Bắt buộc",
    "code": "Không đúng định dạng",
    "another": "Không hợp lệ",
  };
}
