import {AbstractCRUDService} from './crud-service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {copyToClipboard, DateTimeUtil, ExcelHelper, NbDialogConfigUtils, ObjectUtils} from '../utils';
import {AppPagination, ElementTree, FieldForm, ModalResult} from '../common';
import {CrudModel} from './crud-model';
import {CrudForm} from './crud-form';
import {NbDialogConfig, NbDialogService} from '@nebular/theme';
import {finalize} from "rxjs/operators";

@Component({
  template: '',
})
export abstract class AbstractCRUDComponent<T extends CrudModel> extends CrudForm implements OnInit, OnDestroy {

  pagination: AppPagination;
  defaultPagination: AppPagination;
  list: T[];
  nextPage: number;

  service: AbstractCRUDService<T>;
  modalService: NbDialogService;
  formBuilder: FormBuilder;

  isLoading: boolean;
  isLoadingList: { [key: string]: boolean } = {};

  protected constructor(service: AbstractCRUDService<T>, modalService: NbDialogService, formBuilder: FormBuilder) {
    super();
    this.service = service;
    this.formBuilder = formBuilder;
    this.modalService = modalService;
    this.setTitleComponent();
    this.pagination = new AppPagination();
    this.saveDefaultPagination();
    this.nextPage = this.pagination.currentPage;
    this.list = [];
    this.formGroup = this.buildSearchForm();
    this.fields = this.initSearchForm();
  }

  public setTitleComponent() {
    const newTitle = this.getTitle();
    if (newTitle && newTitle.length > 0) {
      this.service.setTitle(this.getTitle());
    }
  }

  public onInit() {
    this.load();
  }

  public abstract onDestroy(): void;

  public abstract getTitle(): string;

  public abstract getCreateModalComponent(): any;

  public abstract getEditModalComponent(): any;

  public abstract getCreateModalComponentOptions(): NbDialogConfig ;

  public abstract getEditModalComponentOptions(): NbDialogConfig ;

  public defaultModalOptions(): NbDialogConfig {
    return NbDialogConfigUtils.newInstance().getConfig();
  }

  public abstract buildSearchForm(): FormGroup;

  public abstract initNewModel(): T;

  public initSearchForm(): FieldForm[] {
    return [
      FieldForm.createTextInput('Tìm kiếm', 'search', 'Nhập từ khóa').setHalfRow(),
    ];
  }

  public prepareParamsToLoad(): any {
    return ObjectUtils.ignoreNullValue(ObjectUtils.combineValue(
      {
        limit: this.pagination.itemsPerPage,
        page: this.pagination.currentPage,
      },
      this.formGroup.getRawValue(),
      true,
    ));
  }

  public load() {
    this.isLoading = true;
    const params: any = this.prepareParamsToLoad();
    this.service.loadByPage(params).pipe(
      finalize(() => {
        this.onLoaded();
      }),
    ).subscribe(res => {
      this.list = res.data;
      this.pagination.set(res);
    }, () => {
      this.list = [];
      this.pagination = this.defaultPagination;
      this.nextPage = this.pagination.currentPage;
    });
  }

  onLoaded(): void {
    this.isLoading = false;
  }

  public onCreated(result: ModalResult<T>) {
    if (result.success) {
      const itemCreated: T = result.data;
      this.list.unshift(itemCreated);
    }
  }

  public onRemoved(item: T, index: number) {
    this.list.splice(index, 1);
  }

  public onEdited(result: ModalResult<T>, item: T, index: number) {
    if (result.success) {
      this.list[index] = ObjectUtils.combineValue(item, result.data);
    }
  }

  public create() {
    const config = NbDialogConfigUtils.fromConfig(this.getEditModalComponentOptions());
    config.setModel(this.initNewModel());
    const modalRef = this.modalService.open(this.getCreateModalComponent(), config.getConfig());
    const sub = modalRef.onClose.subscribe((result: ModalResult<T>) => {
      this.onCreated(result);
      sub.unsubscribe();
    });
  }

  public edit(item: T, index: number) {
    const config = NbDialogConfigUtils.fromConfig(this.getEditModalComponentOptions());
    config.setModel(ObjectUtils.clone(item));
    const modalRef = this.modalService.open(this.getEditModalComponent(), config.getConfig());
    const sub = modalRef.onClose.subscribe((result: ModalResult<T>) => {
      this.onEdited(result, item, index);
      sub.unsubscribe();
    });
  }

  public remove(item: T, index: number) {
    this.service.destroy(item.id).subscribe(() => {
      this.onRemoved(item, index);
      this.service.toastSuccessfullyDeleted();
    }, () => this.service.toastFailedDeleted());

  }

  public export(filename: string, body: any = {}) {
    this.service.export(body).subscribe(blob => {
      ExcelHelper.exportXLSXFile(blob, `${filename}_${DateTimeUtil.today('YYYY_MM_DD_X')}`);
      this.service.toastSuccessfully('Xuất file', 'Thành công');
    });
  }

  public upOrder(item: T, i: number) {
    this.service.up(+item.id).subscribe(res => {
      this.service.toastSuccessfully('Tăng thứ tự');
      this.load();
    }, () => this.service.toastFailedEdited());
  }

  public downOrder(item: T, i: number) {
    this.service.down(+item.id).subscribe(res => {
      this.service.toastSuccessfully('Giảm thứ tự');
      this.load();
    }, () => this.service.toastFailedEdited());
  }

  public onPublishedChange(item: T, index: number, enable: boolean) {
    let methodAsync = null;
    let titleMsg: string = 'Xuất bản';
    if (enable) {
      methodAsync = this.service.enable(item.id);
    } else {
      methodAsync = this.service.disable(item.id);
      titleMsg = 'Lưu trữ';
    }

    methodAsync.subscribe((res: T) => {
      this.list[index].published = res.published;
      this.service.toastSuccessfully(titleMsg);
    }, () => this.service.toastFailed(titleMsg));
  }

  public pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.nextPage = this.pagination.currentPage;
    this.load();
  }

  public goToPage() {
    if (this.nextPage <= 0) {
      this.nextPage = 1;
    }
    if (this.nextPage > this.pagination.numPages) {
      this.nextPage = this.pagination.numPages;
    }
    this.pagination.currentPage = this.nextPage;
    this.load();
  }

  async ngOnInit() {
    await this.loadDynamicDataForSelector();
    this.onInit();
    this.onFormChanged();
  }

  ngOnDestroy() {
    this.onDestroy();
  }

  public copyToClipboard(data: string) {
    copyToClipboard(data);
    this.service.toastSuccessfully('', 'Copy lưu bộ nhớ đệm');
  }

  public viewModalComponent<U extends CrudModel>(modalContent: any, model: U, onClose: (result: ModalResult<U>) => void = null, options: any = {}) {
    const modalRef = this.modalService.open(modalContent, NbDialogConfigUtils.newInstance().patch(options).getConfig());
    modalRef.componentRef.setInput('model', model);
    if (onClose) {
      const sub = modalRef.onClose.subscribe((result: ModalResult<U>) => {
        onClose(result);
        sub.unsubscribe();
      });
    }
  }

  public viewCRUDModalComponent<R extends CrudModel>(
    modalContent: any,
    relatedModel: R,
    onClose: (result: ModalResult<any>) => void = null,
    options: any = {},
  ) {
    const modalRef = this.modalService.open(modalContent, NbDialogConfigUtils.newInstance().patch(options).getConfig());
    modalRef.componentRef.setInput('relatedModel', relatedModel);

    if (onClose) {
      const sub = modalRef.onClose.subscribe((result: ModalResult<any>) => {
        onClose(result);
        sub.unsubscribe();
      });
    }
  }

  /*
  * baohv - them khi co them dang tree
  */
  elementTreeSelected: T;

  handleElementTreeSelected(c: T) {
    this.elementTreeSelected = c;
  }

  editOnTree(data: ElementTree<T>) {
    this.edit(data.item, data.index);
  }

  removeOnTree(data: ElementTree<T>) {
    this.remove(data.item, data.index);
  }

  createHugeModalOptions() {
    return {'class': 'modal-huge', ignoreBackdropClick: true};
  }

  setLimitItemsPerPage(limit: number) {
    this.pagination.setItemsPerPage(limit);
    this.saveDefaultPagination();
  }

  itemNumber(index: number) {
    return this.pagination.itemNumber(index);
  }

  private saveDefaultPagination() {
    this.defaultPagination = this.pagination.clone();
  }
}
