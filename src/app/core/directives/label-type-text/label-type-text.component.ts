import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'd-label-type-text',
  templateUrl: './label-type-text.component.html',
  styleUrls: ['./label-type-text.component.css'],
})
export class LabelTypeTextComponent implements OnInit {

  @Input()
  typeText: string;

  @Input()
  labels: string[] = ['Pending', 'Doing', 'Success', 'Failed'];

  @Input()
  classes: string[] = ['default', 'warning', 'success', 'danger'];

  mappingLabels: any;

  constructor() {
  }

  ngOnInit() {
    this.mappingLabels = [];
    this.labels.forEach((v, index) => {
      this.mappingLabels[v] = this.classes[index];
    });
  }

}
