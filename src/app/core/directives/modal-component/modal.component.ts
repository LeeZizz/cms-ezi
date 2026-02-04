import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NbComponentOrCustomStatus, NbComponentSize} from '@nebular/theme';
import {FieldForm} from '../../index';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'd-modal-component',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  @Input() modalType: '' | NbComponentOrCustomStatus = 'primary';
  @Input() modalSize: '' | NbComponentSize = 'tiny';
  @Input('title') title: string;

  constructor() {
  }

  @Input() formGroup: FormGroup;
  @Input() fields: FieldForm[];
  @Input() isLoading: boolean;

  @Output() dismiss = new EventEmitter<void>();


  dismissAction() {
    this.dismiss.emit();
  }

}
