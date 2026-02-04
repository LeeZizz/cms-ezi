import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FieldForm, ModalResult} from '../../common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'd-input-window',
  templateUrl: './input-window.component.html',
  styleUrls: ['./input-window.component.css'],
})
export class InputWindowComponent implements OnInit {

  @Input() title: string = 'Xác nhận';
  @Input() message: string = 'Bạn xác nhận?';
  @Input() textBtn: string[] = ['Xác nhận', 'Hủy bỏ'];
  @Input() valueBtn: any[] = [true, false];
  formGroup: FormGroup;
  fields: FieldForm[];

  constructor(private modal: NbDialogRef<any>, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      data: new FormControl(null, Validators.required),
    });
    this.fields = [
      FieldForm.createTextInput('Thông tin', 'data'),
    ];
  }

  ngOnInit() {
    this.fields[0].label = this.message;
  }

  dismiss() {
    this.modal.close(new ModalResult<any>());
  }


  confirm() {
    this.modal.close(new ModalResult<any>(this.formGroup.controls['data'].value));
  }
}
