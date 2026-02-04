import {AbstractCRUDService} from './crud-service';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {AppPagination, ModalResult} from '../common';
import {CrudModel} from './crud-model';
import {AbstractCRUDComponent} from './crud.component';
import {NbComponentOrCustomStatus, NbComponentSize, NbDialogRef, NbDialogService} from '@nebular/theme';

@Component({template: ''})
export abstract class AbstractCRUDModalComponent<T extends CrudModel, R extends CrudModel> extends AbstractCRUDComponent<T> implements OnInit, OnDestroy {


  @Input() relatedModel!: R;
  @Input() modalType: '' | NbComponentOrCustomStatus = 'primary';
  @Input() modalSize: '' | NbComponentSize = 'tiny';

  modal: NbDialogRef<any>;

  titleModal: string;

  protected constructor(service: AbstractCRUDService<T>, modal: NbDialogRef<any>, modalService: NbDialogService, formBuilder: FormBuilder) {
    super(service, modalService, formBuilder);
    this.modal = modal;
    this.pagination = new AppPagination();
    this.nextPage = this.pagination.currentPage;
    this.list = [];
  }

  public abstract loaded(): void;


  onInit() {
    this.loaded();
  }

  getTitle(): string {
    return "";
  }


  public dismiss() {
    this.modal.close(new ModalResult<T>());
  }

  public close(model: any) {
    this.modal.close(new ModalResult<T>(model));
  }

  public setTitleModal(title: string) {
    this.titleModal = title;
  }
}
