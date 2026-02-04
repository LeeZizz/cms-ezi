export abstract class CommonConfig extends Object {
  [name: string]: any;

  protected constructor(params?: Object) {
    super();
    const values = params || {};
    Object.getOwnPropertyNames(this).forEach((key) => {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    });
  }

  static default<T extends CommonConfig>(this: new (...args: any[]) => T): T {
    return new this();
  }

  patch(object: Object): this {
    Object.getOwnPropertyNames(this).forEach((key) => {
      if (object.hasOwnProperty(key)) {
        this[key] = object[key];
      }
    });
    return this;
  }

  get(name: string, value: any = null): any {
    return this.hasOwnProperty(name) ? this[name] : value;
  }

  set(name: string, value: any) {
    this[name] = value;
    return this;
  }
}
