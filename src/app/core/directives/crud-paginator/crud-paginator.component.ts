import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppPagination} from '../../common';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'd-crud-paginator',
  templateUrl: './crud-paginator.component.html',
  styleUrls: ['./crud-paginator.component.css'],
})
export class CrudPaginatorComponent implements OnInit {

  @Input()
  pagination: AppPagination;

  @Output() load: EventEmitter<any> = new EventEmitter();

  nextPage: number;

  constructor() {
  }

  ngOnInit() {
    this.nextPage = this.pagination.currentPage;
  }

  public pageChanged(event: PageChangedEvent) {
    this.pagination.currentPage = event.page;
    this.nextPage = this.pagination.currentPage;
    this.load.emit();
  }

  goToPage() {
    if (this.nextPage <= 0) {
      this.nextPage = 1;
    }
    if (this.nextPage > this.pagination.numPages) {
      this.nextPage = this.pagination.numPages;
    }
    this.pagination.currentPage = this.nextPage;
    this.load.emit();
  }
}
