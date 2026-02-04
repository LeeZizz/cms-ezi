import {Observable} from "rxjs";
import {CrudForm} from "../crud";

export enum FieldFormLoaderType {
  LAMBDA = 'LAMBDA',
  FUNCTION = 'FUNCTION',
  FIXED = 'FIXED',
}

export class FieldFormLoader extends Object {
  fn: string;
  params: any;
  type: string;
  data: any[];
  lambda: (p: any) => Observable<any>;


  constructor() {
    super();
    this.fn = null;
    this.type = FieldFormLoaderType.FIXED;
    this.params = {};
    this.data = [];
    this.lambda = () => Observable.empty();
  }

  setFn(fn: any) {
    if (typeof fn === 'string') {
      this.fn = fn;
    } else if (typeof fn === 'function') {
      this.lambda = fn;
    } else if (Array.isArray(fn)) {
      this.data = fn;
    } else {
      console.error(typeof fn, fn);
    }
    return this;
  }

  setData(data: any[]) {
    this.data = data;
    return this;
  }

  setParams(params: any) {
    this.params = params;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  static default(): FieldFormLoader {
    return new FieldFormLoader();
  }

  static fixed(data: any[]): FieldFormLoader {
    return this.default().setData(data);
  }

  static fromFunctionName(name: string, params: any = {}): FieldFormLoader {
    return this.default().setFn(name).setParams(params).setType(FieldFormLoaderType.FUNCTION);
  }

  static fromLambda(lambda: (p: any) => Observable<any>, params: any = {}): FieldFormLoader {
    return this.default().setFn(lambda).setParams(params).setType(FieldFormLoaderType.LAMBDA);
  }

  isFixed(): boolean {
    return this.type === FieldFormLoaderType.FIXED;
  }

  isLambda(): boolean {
    return this.type === FieldFormLoaderType.LAMBDA;
  }

  isFunction(): boolean {
    return this.type === FieldFormLoaderType.FUNCTION;
  }

  idDynamicLoader(): boolean {
    return this.isFunction() || this.isLambda();
  }

  getObservable(context: CrudForm): Observable<any> {
    if (this.isFunction()) {
      return context[this.fn](this.params);
    } else if (this.isLambda()) {
      return this.lambda(this.params);
    }
    return Observable.empty();
  }

  getData(): any[] {
    return this.isFixed() ? this.data : null;
  }

}
