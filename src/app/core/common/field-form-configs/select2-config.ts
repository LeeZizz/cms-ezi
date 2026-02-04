import {CommonConfig} from "./common-config";

export class Select2Config extends CommonConfig {
  singleSelection: boolean = true;
  text: string = "Chọn một";
  enableCheckAll: boolean = true;
  selectAllText: string = 'Chọn tất cả';
  unSelectAllText: string = 'Bỏ chọn tất cả';
  enableSearchFilter: boolean = true;
  enableFilterSelectAll: boolean = true;
  searchPlaceholderText: string = 'Tìm kiếm';
  labelKey: string = 'name';
  primaryKey: string = 'id';
  searchBy: string[] = ['name'];
  noDataLabel: string = 'Không có dữ liệu phù hợp';
  addNewItemOnFilter: boolean = false;
  addNewButtonText: string = "Thêm mới";

  constructor(params?: any) {
    super(params || {});
  }

  static createSingle(): Select2Config {
    return this.default().patch({
      singleSelection: true,
      text: 'Chọn một',
      enableCheckAll: true,
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      enableFilterSelectAll: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataLabel: 'Không có dữ liệu phù hợp',
      addNewItemOnFilter: false,
      addNewButtonText: 'Thêm mới',
      labelKey: 'name',
      primaryKey: 'id',
      searchBy: ['name'],
    });
  }

  static createMulti(): Select2Config {
    return this.default().patch({
      singleSelection: false,
      text: 'Chọn nhiều',
      enableCheckAll: true,
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      enableSearchFilter: true,
      enableFilterSelectAll: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataLabel: 'Không có dữ liệu phù hợp',
      addNewButtonText: 'Thêm mới',
      addNewItemOnFilter: false,
      labelKey: 'name',
      primaryKey: 'id',
      searchBy: ['name'],
    });
  }

  setLabelKey(labelKey: string) {
    return this.set('labelKey', labelKey);
  }

  setPrimaryKey(primaryKey: string) {
    return this.set('primaryKey', primaryKey);
  }

  setSearchBy(searchBy: string[]) {
    return this.set('searchBy', searchBy);
  }
}

