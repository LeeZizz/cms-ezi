import {
  CommonConfig,
  DateInputConfig,
  FileInputConfig,
  HtmlEditorConfig,
  InputConfig,
  NumberInputConfig,
  Select2Config,
  SelectConfig,
} from './field-form-configs';
import {FieldFormLoader} from "./field-form-loader";
import {StringUtils} from "../utils";

export class FieldForm extends Object {
  label: string = null;
  type: string = null;
  typeOf: string = null;
  formControl: string = null;
  placeHolder: string = 'Nhập kí tự';
  data: any[] = [];
  config: CommonConfig = null;
  loader: FieldFormLoader = null;
  class: string = 'col-md-12';
  dependFormControl: string = null;

  constructor(params?: Object) {
    super();
    const values = params || {};
    Object.keys(this).forEach((key) => {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    });
  }


  static createPasswordInput(labelName: string, formControlName: string, placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'input',
      typeOf: 'password',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: InputConfig.default(),
    });
  }

  static createTextInput(labelName: string, formControlName: string, placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'input',
      typeOf: 'text',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: InputConfig.default(),
    });
  }

  static createDateTimeInput(labelName: string, formControlName: string,
                             config: DateInputConfig = DateInputConfig.defaultDateTime(),
                             placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'input',
      typeOf: 'datetime-local',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: config,
    });
  }

  static createDateInput(labelName: string, formControlName: string,
                         config: DateInputConfig = DateInputConfig.defaultDatePicker(),
                         placeHolder: string = 'Chon ngày YYYY-MM-DD', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'datepicker',
      typeOf: 'date',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: config,
    });
  }

  static createTimeInput(labelName: string, formControlName: string,
                         config: DateInputConfig = DateInputConfig.defaultTimePicker(),
                         placeHolder: string = 'Chọn giờ:phút:giây', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'timepicker',
      typeOf: 'time',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: config,
    });
  }

  static createNumberInput(labelName: string, formControlName: string, config:
                           NumberInputConfig = NumberInputConfig.default().set('step', 1),
                           placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'input',
      typeOf: 'number',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: config,
    });
  }

  static createMultiSelect2(labelName: string, formControlName: string,
                            loader: FieldFormLoader,
                            config: Select2Config = Select2Config.createMulti(),
                            placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'select2',
      typeOf: 'multi',
      formControl: formControlName,
      placeHolder: placeHolder,
      loader: loader,
      // data: loader.getData(),
      config: config,
      class: classes ?? 'col-md-12',
      dependFormControl: StringUtils.toPluralCase(formControlName),
    });
  }

  static createSingleSelect2(labelName: string, formControlName: string, loader: FieldFormLoader,
                             config: Select2Config = Select2Config.createSingle(),
                             placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'select2',
      typeOf: 'single',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      loader: loader,
      // data: loader.getData(),
      config: config,
      dependFormControl: formControlName + '_id',
    });
  }

  static createSelect(labelName: string, formControlName: string, loader: FieldFormLoader,
                      config: SelectConfig = SelectConfig.from('name', 'id'),
                      placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'select',
      typeOf: 'single',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      data: loader.getData(),
      loader: loader,
      config: config,
    });
  }

  static createTextArea(labelName: string, formControlName: string, rows_count: number = 5, placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'textarea',
      typeOf: 'text',
      formControl: formControlName,
      placeHolder: placeHolder,
      config: InputConfig.default().patch({
        rows: rows_count,
      }),
      class: classes ?? 'col-md-12',
    });
  }


  static createCheckbox(labelName: string, formControlName: string, placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'checkbox',
      typeOf: 'text',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
    });
  }

  static createFileInput(labelName: string, formControlName: string,
                         config: FileInputConfig,
                         placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12') {
    return new FieldForm({
      label: labelName,
      type: 'file',
      typeOf: 'normal',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: config,
    });
  }

  static createImageFileInput(labelName: string, formControlName: string, config: FileInputConfig,
                              placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12') {
    return new FieldForm({
      label: labelName,
      type: 'file',
      typeOf: 'image',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: config,
    });
  }

  static createHtmlInput(labelName: string, formControlName: string, config: HtmlEditorConfig = HtmlEditorConfig.default(), placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12') {
    return new FieldForm({
      label: labelName,
      type: 'html',
      typeOf: 'text',
      formControl: formControlName,
      placeHolder: placeHolder,
      config: config,
      class: classes ?? 'col-md-12',
    });
  }

  static createSelectItem(label: string, value: any = null) {
    return {
      'id': value != null ? value : label,
      'name': label,
    };
  }

  static createTagInput(labelName: string, formControlName: string, placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12') {
    return new FieldForm({
      label: labelName,
      type: 'tag-input',
      typeOf: 'text',
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
    });
  }

  static createInput(typeOf: string, labelName: string, formControlName: string, placeHolder: string = 'Nhập kí tự', classes: string = 'col-md-12'): FieldForm {
    return new FieldForm({
      label: labelName,
      type: 'input',
      typeOf: typeOf,
      formControl: formControlName,
      placeHolder: placeHolder,
      class: classes ?? 'col-md-12',
      config: InputConfig.default(),
    });
  }

  static createValueTypeSelectorItem() {
    return [
      FieldForm.createSelectItem('Chuỗi văn bản', 'text'),
      FieldForm.createSelectItem('Chuỗi số', 'number'),
      FieldForm.createSelectItem('Hình ảnh', 'image'),
      FieldForm.createSelectItem('Dạng file', 'file'),
      FieldForm.createSelectItem('Văn bản dài', 'long_text'),
      FieldForm.createSelectItem('Siêu văn bản', 'html'),
    ];
  }

  setHalfRow() {
    return this.set('class', 'col-md-6');
  }

  hasDynamicLoader() {
    return this.loader && this.loader.idDynamicLoader();
  }

  patch(object: Object): this {
    Object.getOwnPropertyNames(this).forEach((key) => {
      if (object.hasOwnProperty(key)) {
        this[key] = object[key];
      }
    });
    return this;
  }

  get(name: string): any {
    return this[name];
  }

  set(name: string, value: any): this {
    this[name] = value;
    return this;
  }

  setDependFormControl(name: string): this {
    return this.set('dependFormControl', name);
  }
}
