import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {ModalResult} from '../../common';

@Component({
  selector: 'd-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css'],
})
export class ConfirmWindowComponent implements OnInit {

  @Input() title: string = 'Xác nhận';
  @Input() message: string = 'Bạn xác nhận?';
  @Input() textBtn: string[] = ['Xác nhận', 'Hủy bỏ'];
  @Input() valueBtn: any[] = [true, false];

  constructor(private modal: NbDialogRef<any>) {
  }

  ngOnInit() {
  }

  dismiss() {
    this.modal.close(new ModalResult<any>());
  }


  confirm() {
    this.modal.close(new ModalResult<any>(this.valueBtn[0]));
  }

  cancel() {
    this.modal.close(new ModalResult<any>(this.valueBtn[1]));
  }
}
