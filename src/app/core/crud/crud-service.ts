import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {TitleService, ToasterService} from '../services';
import {catchError, map} from 'rxjs/operators';
import {DataResponse, PaginationOutput} from '../common';
import {pathJoin, StorageUtil} from '../utils';
import {CrudModel} from './crud-model';
import {EMPTY} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class AbstractCRUDService<T extends CrudModel> {

  apiEndpoint: string;

  protected constructor(public http: HttpClient, public title: TitleService, public toast: ToasterService, public titlePopup: string, public url: string) {
    this.setNamespace("admin");
  }

  setNamespace(namespace: string) {
    if (namespace) {
      this.apiEndpoint = pathJoin([namespace, this.url]);
    }
  }

  fixedUrl(newURL: string): void {
    if (newURL) {
      this.apiEndpoint = newURL;
    }
  }

  toPipe(thread: Observable<DataResponse<any>>) {
    return thread.pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  loadAll(): Observable<T[]> {
    return this.http.get<DataResponse<T[]>>(this.apiEndpoint)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  loadByPage(params: any): Observable<PaginationOutput<T>> {
    const parameters: HttpParams = new HttpParams({
      fromObject: params,
    });
    return this.http.get<DataResponse<PaginationOutput<T>>>(this.apiEndpoint, {params: parameters})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  loadByID(id: number | string): Observable<T> {
    return this.http.get<DataResponse<T>>(`${this.apiEndpoint}/${id}`)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  loadByParams(params: any): Observable<T[]> {
    const parameters: HttpParams = new HttpParams({
      fromObject: params,
    });
    return this.http.get<DataResponse<T[]>>(this.apiEndpoint, {params: parameters})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  findByParams(params: any): Observable<T> {
    const parameters: HttpParams = new HttpParams({
      fromObject: params,
    });
    return this.http.get<DataResponse<T>>(this.apiEndpoint, {params: parameters})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  store(object: T): Observable<T> {
    return this.http.post<DataResponse<T>>(this.apiEndpoint, object)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  update(object: T): Observable<T> {
    return this.http.put<DataResponse<T>>(`${this.apiEndpoint}/${object['id']}`, object)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  storeWithFile(item: T): Observable<T> {
    const formData = new FormData();
    Object.keys(item).forEach(key => {
      if (Array.isArray(item[key])) {
        for (const f of item[key]) {
          formData.append(`${key}[]`, f);
        }
      } else {
        formData.append(key, item[key]);
      }
    });
    return this.http.post<DataResponse<T>>(this.apiEndpoint, formData, {headers: new HttpHeaders({uploadFile: 'true'})})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  updateWithFile(item: T): Observable<any> {
    const formData = this.body2FormData(item);
    return this.http.post<DataResponse<T>>(`${this.apiEndpoint}/${item['id']}`, formData, {headers: new HttpHeaders({uploadFile: 'true'})})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  destroy(id: number | string): Observable<T> {
    return this.http.delete<DataResponse<T>>(`${this.apiEndpoint}/${id}`)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  destroyWithParams(id: number, params: any): Observable<T> {
    return this.http.delete<DataResponse<T>>(`${this.apiEndpoint}/${id}`, {params: params})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  enable(id: number | string): Observable<T> {
    return this.postByAction(id, 'enable');
  }

  disable(id: number | string): Observable<T> {
    return this.postByAction(id, 'disable');
  }

  approve(id: number | string): Observable<T> {
    return this.postByAction(id, 'approve');
  }

  disapprove(id: number | string): Observable<T> {
    return this.postByAction(id, 'disapprove');
  }

  active(id: number | string) {
    return this.postByAction(id, 'active');
  }

  inactive(id: number | string) {
    return this.postByAction(id, 'inactive');
  }

  up(id: number | string) {
    return this.postByAction(id, 'up');
  }

  down(id: number | string) {
    return this.postByAction(id, 'down');
  }

  postByAction(id: number | string, action: string, body: any = {}) {
    return this.http.post<DataResponse<T>>(`${this.apiEndpoint}/${id}/${action}`, body)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  executeAction(action: string, body: any = {}) {
    return this.http.post<DataResponse<T>>(pathJoin([this.apiEndpoint, action]), body)
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  postByActionWithFile(id: number | string, action: string, body: any = {}) {
    const formData = this.body2FormData(body);
    return this.http.post<DataResponse<T>>(`${this.apiEndpoint}/${id}/${action}`, formData, {headers: new HttpHeaders({uploadFile: 'true'})})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  executeActionWithFile(action: string, body: any = {}) {
    const formData = this.body2FormData(body);
    return this.http.post<DataResponse<T>>(`${this.apiEndpoint}/${action}`, formData, {headers: new HttpHeaders({uploadFile: 'true'})})
      .pipe(catchError(this.handleErrorRequest.bind(this)), map(res => res['data']));
  }

  private body2FormData(body: any): FormData {
    const formData = new FormData();
    Object.keys(body).forEach(key => {
      if (Array.isArray(body[key])) {
        for (const f of body[key]) {
          formData.append(`${key}[]`, f);
        }
      } else {
        if (body[key]) {
          formData.append(key, body[key]);
        }
      }
    });
    return formData;
  }

  toastSuccessfullyCreated() {
    this.toast.pop('success', `Thêm ${this.titlePopup}`, 'Thành công');
  }

  toastSuccessfullyEdited() {
    this.toast.pop('success', `Sửa ${this.titlePopup}`, 'Thành công');
  }

  toastSuccessfullyDeleted() {
    this.toast.pop('success', `Xóa ${this.titlePopup}`, 'Thành công');
  }


  toastSuccessfully(action: string, content?: string) {
    this.toast.pop('success', `${action} ${this.titlePopup}`, content ? content : 'Thành công');
  }

  toastFailedCreated() {
    this.toast.pop('error', `Thêm ${this.titlePopup}`, 'Thất bại');
  }

  toastFailedEdited() {
    this.toast.pop('error', `Sửa ${this.titlePopup}`, 'Thất bại');
  }

  toastFailedDeleted() {
    this.toast.pop('error', `Xóa ${this.titlePopup}`, 'Thất bại');
  }

  toastFailed(action: string, content?: string) {
    this.toast.pop('error', `${action} ${this.titlePopup}`, content ? content : 'Thất bại');
  }

  setTitle(title: string) {
    this.title.setTitle(title);
  }

  toastError(title: string, content?: string) {
    this.toast.pop('error', `${title}`, content ? content : 'Thất bại');
  }

  toastSuccess(title: string, content?: string) {
    this.toast.pop('success', `${title}`, content ? content : 'Thành công');
  }

  toastWarning(action: string, content?: string) {
    this.toast.pop('warning', `${action}`, content ? content : 'Cảnh báo');
  }

  handleErrorRequest(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      this.toastError('Client phản hồi', 'Lỗi xảy ra');
    } else {
      if (err.status === 401) {
       /* StorageUtil.clear();
        setTimeout(function () {
          window.location.href = `/login`;
        }, 500);*/
      } else {
        if (err.status >= 400 && err.status < 500) {
          this.toastError('Hệ thống phản hồi', `${err.error['message']}`);
        } else {
          if (err.status >= 500) {
            this.toastError(`Hệ thống phản hồi`, `${err.error['message']}`);
          } else {
            this.toastError('Lỗi hệ thống phản hồi', `Không xác định lỗi`);
          }
        }
      }
    }
    return EMPTY;
  }

  import(file: any, body: any) {
    const formData = new FormData();
    Object.keys(body).forEach(key => formData.append(key, body[key]));
    formData.append('file', file);
    return this.http.post(`${this.apiEndpoint}/import`, formData, {
      headers: new HttpHeaders({uploadFile: 'true'}),
      responseType: 'blob',
      observe: 'response',
    }).pipe(
      catchError(err => this.handleErrorRequest(err)),
    );
  }

  export(body: any) {
    return this.http.get(`${this.apiEndpoint}/export`, {
      responseType: 'blob',
      observe: 'response',
      params: body,
    })
      .pipe(
        catchError(err => this.handleErrorRequest(err)),
      );
  }


}
