import {Attribute, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'd-button-confirm',
  templateUrl: './button-confirm.component.html',
  styleUrls: ['./button-confirm.component.css'],
})
export class ButtonConfirmComponent implements OnInit {

  constructor(@Attribute('title') public title: string) {
  }

  ngOnInit() {
  }

  @Input() confirmTitle: string = 'Xóa đối tượng';
  @Output() confirm: EventEmitter<void> = new EventEmitter();

}
