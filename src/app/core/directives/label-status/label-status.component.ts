import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'd-label-status',
  templateUrl: './label-status.component.html',
  styleUrls: ['./label-status.component.css'],
})
export class LabelStatusComponent implements OnInit {

  @Input()
  active: boolean;

  @Input()
  labels: string[] = ['Hoạt động', 'Dừng hoạt động'];

  @Input()
  classes: string[] = ['success', 'danger'];

  constructor() {
  }

  ngOnInit() {
  }

}
