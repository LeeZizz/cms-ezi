import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrudModel} from '../../crud';

@Component({
  selector: 'd-simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.css'],
})
export class SimpleTreeComponent<T extends CrudModel> implements OnInit {

  @Input()
  title: string;
  @Input()
  list: T[];
  @Input('attr-name')
  attrName: string = 'name';

  @Input('enable-crud')
  enableCRUD: boolean = true;

  itemSelected: T;

  @Output() createEvent: EventEmitter<any> = new EventEmitter();
  @Output() itemSelectedEvent: EventEmitter<T> = new EventEmitter();
  @Output() editEvent: EventEmitter<{ item: T, index: number }> = new EventEmitter();
  @Output() removeEvent: EventEmitter<{ item: T, index: number }> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }


  create() {
    this.createEvent.emit();
  }

  handleItemSelected(c: any) {
    this.itemSelected = c;
    this.itemSelectedEvent.emit(c);
  }

  remove(c: T, i: number) {
    this.removeEvent.emit({item: c, index: i});
  }

  edit(c: T, i: number) {
    this.editEvent.emit({item: c, index: i});
  }
}
