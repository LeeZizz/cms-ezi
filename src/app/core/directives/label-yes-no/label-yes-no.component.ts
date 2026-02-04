import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'd-label-yes-no',
  templateUrl: './label-yes-no.component.html',
  styleUrls: ['./label-yes-no.component.css'],
})
export class LabelYesNoComponent implements OnInit {

  @Input()
  variable: boolean;

  @Input()
  labels: string[] = ['danger', 'default'];

  constructor() {
  }

  ngOnInit() {
  }

}
