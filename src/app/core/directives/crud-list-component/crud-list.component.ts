import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NbComponentOrCustomStatus, NbComponentSize} from '@nebular/theme';
import {AppPagination, FieldForm} from '../../index';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'd-crud-list-component',
  templateUrl: './crud-list.component.html',
})
export class CrudListComponent {

  @Input() modalType: '' | NbComponentOrCustomStatus = 'basic';
  @Input() modalSize: '' | NbComponentSize = 'giant';
  @Input() title: string;
  @Input() createBtnEnabled: boolean = true;

  @Input() formGroup: FormGroup;
  @Input() fields: FieldForm[];
  @Input() pagination: AppPagination;

  @Output() load = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();
  @Input() isLoading: boolean;

  loadAction() {
    this.load.emit();
  }

  createAction() {
    this.create.emit();
  }
}
