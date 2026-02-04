import {PaginationOutput} from './pagination-output.metadata';

/**
 * Created by BaoHoang on 8/22/2017.
 */

export class AppPagination extends Object {
  totalItems: number;
  currentPage: number;
  numPages: number;
  maxSize: number;
  itemsPerPage: number;

  constructor(object?: Object) {
    super();
    if (object) {
      this.totalItems = object['totalItems'] ?? null;
      this.currentPage = object['currentPage'] ?? null;
      this.numPages = object['numPages'] ?? null;
      this.maxSize = object['maxSize'] ?? null;
      this.itemsPerPage = object['itemsPerPage'] ?? null;
    } else {
      this.totalItems = 0;
      this.currentPage = 1;
      this.numPages = 0;
      this.maxSize = 5;
      this.itemsPerPage = 20;
    }
  }

  clone() {
    return new AppPagination({...this});
  }

  set(output: PaginationOutput<any>) {
    this.totalItems = output.total;
    this.currentPage = output.current_page;
    this.numPages = output.last_page;
  }

  itemNumber(index: number) {
    return (this.currentPage - 1) * this.itemsPerPage + index + 1;
  }

  setItemsPerPage(limit: number) {
    this.itemsPerPage = limit;
  }

}
