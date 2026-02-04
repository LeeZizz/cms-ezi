import {FieldForm} from '../common';
import {FormControl, FormGroup} from '@angular/forms';
import {ArrayUtils, ObjectUtils} from '../utils';
import {CrudModel} from './crud-model';
import {AbstractCRUDService} from './crud-service';

export class CrudForm {

  private _fields: FieldForm[];
  private _formGroup: FormGroup;

  constructor() {
  }

  set fields(value: FieldForm[]) {
    this._fields = value;
  }

  set formGroup(value: FormGroup) {
    this._formGroup = value;
  }

  get fields(): FieldForm[] {
    return this._fields;
  }

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  public getFieldIndexByName(fieldName: string) {
    const index = this._fields.map(f => f.formControl).indexOf(fieldName);
    if (index < 0) {
      throw new Error(`insertField: Không có form control có tên ${fieldName}`);
    }
    return index;
  }

  public getFieldByName(fieldName: string) {
    return this._fields[this.getFieldIndexByName(fieldName)];
  }

  public setFieldAttrByName(fieldName: string, attrName: string, attrValue: any): FieldForm {
    const field = this._fields[this.getFieldIndexByName(fieldName)];
    field[attrName] = attrValue;
    return field;
  }

  public replaceFieldByFieldName(fieldName: string, replaceForm: FieldForm) {
    const index = this.getFieldIndexByName(fieldName);
    this._fields.splice(index, 1, replaceForm);
  }

  public addField(insertForm: FieldForm) {
    this._fields.push(insertForm);
  }

  public insertField(afterField: string, insertForm: FieldForm) {
    const index = this.getFieldIndexByName(afterField);
    if (index === this._fields.length - 1) {
      this.addField(insertForm);
    } else {
      this._fields.splice(index + 1, 0, insertForm);
    }
  }

  public removeField(field: string) {
    const index = this.getFieldIndexByName(field);
    this._fields.splice(index, 1);
  }

  public removeFieldIfExists(field: string) {
    try {
      const index = this.getFieldIndexByName(field);
      this._fields.splice(index, 1);
    } catch (err) {

    }
  }

  public getDataByFieldName(fieldName: string) {
    const index = this.getFieldIndexByName(fieldName);
    if (index < 0) {
      throw new Error(`getData: Không có form control có tên ${fieldName}`);
    }
    return this._fields[index].data;
  }

  public setDataByFieldName(fieldName: string, data: any[]) {
    const index = this.getFieldIndexByName(fieldName);
    if (index < 0) {
      throw new Error(`setData: Không có form control có tên ${fieldName}`);
    }
    this._fields[index].data = data;
  }

  public setValidators(formControl: string, validators: any[]) {
    this._formGroup.controls[formControl].setValidators(validators);
    this._formGroup.controls[formControl].updateValueAndValidity();
  }

  public clearValidators(formControl: string) {
    this._formGroup.controls[formControl].clearValidators();
    this._formGroup.controls[formControl].updateValueAndValidity();
  }

  public loadDataForSelect2(controlName: string, functionName: any, params: any) {
    this[functionName](params).subscribe(v => this.setFieldAttrByName(controlName, 'data', v));
  }

  public getFormValue(key: string) {
    if (!this._formGroup.contains(key)) {
      throw new Error(`getFormValue: Không có form control có tên ${key}`);
    }
    return this._formGroup.get(key).value;
  }

  public getFormValues(ignoreNull: boolean = true) {
    return ignoreNull ? ObjectUtils.ignoreNullValue(this._formGroup.value) : this._formGroup.value;
  }


  public setFormValueByControl(control: string, value: any, option?: any) {
    if (!this._formGroup.contains(control)) {
      throw new Error(`Không có form control có tên ${control}`);
    }
    this._formGroup.controls[control].setValue(value, option);
  }

  public setFormValueByControlIfNull(control: string, value: any, option?: any) {
    if (!this._formGroup.contains(control)) {
      throw new Error(`Không có form control có tên ${control}`);
    }
    const initValue = this.getFormValue(control);
    if (ObjectUtils.isNull(initValue)) {
      this._formGroup.controls[control].setValue(value, option);
    }
  }

  public onFileUploadChange(formGroup: FormGroup, controlName: string, event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      formGroup.controls[controlName].setValue(input.files[0]);
    } else {
      formGroup.controls[controlName].setValue(null);
    }
  }

  public onImageUploadChange(formGroup: FormGroup, controlName: string, event: any) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const imageElement: HTMLImageElement = <HTMLImageElement>document.getElementById('image-' + controlName);
      if (imageElement) {
        const fr = new FileReader();
        fr.onload = function () {
          if (typeof fr.result === 'string') {
            imageElement.src = fr.result;
          }
        };
        fr.readAsDataURL(file);
      }
      formGroup.controls[controlName].setValue(file);
    } else {
      formGroup.controls[controlName].setValue(null);
    }
  }

  public onMultipleFileUploadChange(formGroup: FormGroup, controlName: string, event: any) {
    const input = event.target;
    const files = [];
    if (input.files) {
      for (const f of input.files) {
        files.push(f);
      }
    }
    formGroup.controls[controlName].setValue(files.length > 0 ? files : null);
  }

  public onCheckboxChange(controlName: string, event: any) {
    if (event.target.checked) {
      this._formGroup.controls[controlName].setValue(1);
    } else {
      this._formGroup.controls[controlName].setValue(0);
    }
  }

  public onFormControlChanged(name: string, next: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this._formGroup.controls[name].valueChanges.subscribe(value => {
      next(value);
    }, error, complete);
  }

  public onMultiSelectChanged(name: string, next: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this._formGroup.controls[name].valueChanges.subscribe(value => {
      if (ObjectUtils.isNull(value)) {
        next(null);
        return;
      }
      next(ArrayUtils.isNotEmpty(value) ? value : null);
    }, error, complete);
  }

  public onSingleSelectChanged(name: string, next: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this._formGroup.controls[name].valueChanges.subscribe(value => {
      if (ObjectUtils.isNull(value)) {
        next(null);
        return;
      }
      next(ArrayUtils.isNotEmpty(value) ? value[0] : null);
    }, error, complete);
  }


  public onFormChanged(): void {
    this._fields.forEach(field => {
      if (field.type === 'select2') {
        const primaryKey = field.config.get('primaryKey', 'id');
        if (field.typeOf === 'single') {
          this.onSingleSelectChanged(field.formControl, (selectedValue: any) => {
            if (ObjectUtils.isNotNull(selectedValue)) {
              this.setFormValueByControl(field.dependFormControl, selectedValue[primaryKey]);
            } else {
              this.setFormValueByControl(field.dependFormControl, null);
            }
          });
        } else if (field.typeOf === 'multi') {
          this.onMultiSelectChanged(field.formControl, (selectedValues: any[]) => {
            if (ObjectUtils.isNotNull(selectedValues)) {
              this.setFormValueByControl(field.dependFormControl, selectedValues.map(e => e[primaryKey]).join(','));
            } else {
              this.setFormValueByControl(field.dependFormControl, null);
            }
          });
        }
      }
    });
  }

  public setParamForSelectorLoader(index: number, param: any) {
    this._fields[index].loader.params = param;
  }

  public reloadLoaderByNewParams(formControl: string, param: any) {
    const context = this;
    this._fields.filter(field => field.hasDynamicLoader())
      .filter(field => field.formControl === formControl).forEach(field => {
      field.loader.params = param;
      field.loader.getObservable(context).subscribe((arr) => {
        field.data = arr;
      });
    });
  }

  public async loadDynamicDataForSelector() {
    const context = this;
    this._fields.filter(field => field.loader && field.loader.isFixed()).forEach(field => {
      field.data = field.loader.getData();
    });
    const dynamicFields = this._fields.filter(field => field.hasDynamicLoader());
    for (const field of dynamicFields) {
      field.data = await field.loader.getObservable(context).toPromise();
    }
  }


  public loadData<U extends CrudModel>(service: AbstractCRUDService<U>, body: any) {
    return service.loadByParams(body);
  }


  public hasFileInput(): boolean {
    for (const field of this.fields) {
      if (field.type === 'file') {
        return true;
      }
    }
    return false;
  }

  public addFormControl(name: string, formControl: FormControl) {
    this._formGroup.addControl(name, formControl);
  }

}
