import {FormBuilder, FormGroup} from '@angular/forms';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractCRUDService} from './crud-service';
import {ObjectUtils} from '../utils';
import {FieldForm, ModalResult} from '../common';
import {CrudModel} from './crud-model';
import {CrudForm} from './crud-form';
import {NbComponentOrCustomStatus, NbComponentSize, NbDialogRef} from '@nebular/theme';

@Component({
  template: '',
})
export abstract class AbstractModalComponent<T extends CrudModel> extends CrudForm implements OnInit, OnDestroy {

  @Input() model!: T;
  @Input() modalType: '' | NbComponentOrCustomStatus = 'primary';
  @Input() modalSize: '' | NbComponentSize = 'tiny';

  service: AbstractCRUDService<T>;
  modal: NbDialogRef<any>;
  formBuilder: FormBuilder;
  titleModal: string;
  isLoading: boolean = false;


  public initFieldForm(): FieldForm[] {
    return [];
  }

  protected constructor(service: AbstractCRUDService<T>, modal: NbDialogRef<any>, formBuilder: FormBuilder) {
    super();
    this.service = service;
    this.modal = modal;
    this.formBuilder = formBuilder;
    this.formGroup = this.buildForm();
    this.fields = this.initFieldForm();
    this.onFormChanged();
    this.isLoading = true;
  }

  public abstract onInit(): void;

  public abstract onDestroy(): void;

  public abstract buildForm(): FormGroup;

  public abstract loaded(): void;

  prepareParams() {
    const formValues = this.formGroup.getRawValue();
    this.fields.forEach(val => {
      if (val.type === 'select2') {
        delete formValues[val.formControl];
      }
    });
    return ObjectUtils.combineValue(this.model, formValues);
  }

  create() {
    this.isLoading = true;
    if (this.hasFileInput()) {
      this.createWithFile();
    } else {
      const item: T = this.prepareParams();
      this.service.store(item).subscribe(res => {
        this.service.toastSuccessfullyCreated();
        this.close(res);
      }, () => this.service.toastFailedCreated(), () => {
        this.isLoading = false;
      });
    }
  }

  edit() {
    this.isLoading = true;
    if (this.hasFileInput()) {
      this.editWithFile();
    } else {
      const item: T = this.prepareParams();
      this.service.update(item).subscribe(res => {
        this.service.toastSuccessfullyEdited();
        this.close(ObjectUtils.combineValue(this.model, res));
      }, () => this.service.toastFailedEdited(), () => {
        this.isLoading = false;
      });
    }
  }

  createWithFile() {
    const item: T = this.prepareParams();
    this.service.storeWithFile(item).subscribe(res => {
      this.service.toastSuccessfullyCreated();
      this.close(res);
    }, () => this.service.toastFailedCreated(), () => {
      this.isLoading = false;
    });
  }

  editWithFile() {
    const item: T = this.prepareParams();
    this.service.updateWithFile(item).subscribe(res => {
      this.service.toastSuccessfullyEdited();
      this.close(ObjectUtils.combineValue(this.model, res));
    }, () => this.service.toastFailedEdited(), () => {
      this.isLoading = false;
    });
  }


  async ngOnInit() {
    const totalLoader: number = this.fields.filter(field => field.hasDynamicLoader()).length;
    if (totalLoader === 0) {
      this.isLoading = false;
      this.setFormValue();
      this.onInit();
    } else {
      await this.loadDynamicDataForSelector();
      this.isLoading = false;
      this.setFormValue();
      this.onInit();
    }
  }

  ngOnDestroy() {
    this.onDestroy();
  }

  public setFormValue() {
    const specs = {};
    this.fields.forEach(field => {
      const formControl = field.formControl;
      const initValue = this.model[field.formControl];
      if (initValue !== null) {
        if (field.type === 'select2') {
          specs[formControl] = field;
          this.setSelect2Field(field, initValue);
        }
      }
    });

    Object.keys(this.formGroup.controls).forEach(key => {
      if (this.model.hasOwnProperty(key) && !specs.hasOwnProperty(key)) {
        this.formGroup.get(key).setValue(this.model[key]);
      }
    });
  }

  setSelect2Field(fieldForm: FieldForm, initValue: any) {
    if (!ObjectUtils.isNull(initValue)) {
      if (fieldForm.typeOf === 'single') {
        this.formGroup.get(fieldForm.formControl).setValue([initValue]);
      } else if (fieldForm.typeOf === 'multi') {
        this.formGroup.get(fieldForm.formControl).setValue([initValue]);
      }
    }
  }

  setSelect2FieldByDependency(formControl: string) {
    const fieldForm = this.getFieldByName(formControl);
    const dependValue = this.getFormValue(fieldForm.dependFormControl);
    const primaryKey = fieldForm.config.get('primaryKey', 'id');
    if (ObjectUtils.isNotNull(dependValue)) {
      this.formGroup.get(fieldForm.formControl).setValue(
        fieldForm.data.filter(value => dependValue.indexOf(value[primaryKey]) > -1),
      );
    }
  }

  public dismiss() {
    this.modal.close(new ModalResult<any>());
  }

  public close(model: any) {
    this.modal.close(new ModalResult<any>(model));
  }

}
