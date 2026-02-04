import {Attribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {NbComponentOrCustomStatus, NbComponentSize} from '@nebular/theme';
import {FieldForm} from '../../index';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'd-crud-modal-component',
  templateUrl: './crud-modal.component.html',
})
export class CrudModalComponent {

  @Input() modalType: '' | NbComponentOrCustomStatus = 'primary';
  @Input() modalSize: '' | NbComponentSize = 'tiny';

  constructor(@Attribute('title') public title: string) {
  }

  @Input() formGroup: FormGroup;
  @Input() fields: FieldForm[];

  @Output() submit = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();
  @Input() btnSubmitTxt: string;
  @Input() btnDismissTxt: string;
  @Input() isLoading: boolean;

  submitAction() {
    this.submit.emit();
  }

  dismissAction() {
    this.dismiss.emit();
  }

}
