export class ObjectUtils {
  static ignoreNullValue(target: any): any {
    const result: any = {};
    for (const i in target) {
      if (target.hasOwnProperty(i)) {
        const value = target[i];
        if (ObjectUtils.isNotNull(value)) {
          result[i] = target[i];
        }
      }
    }
    return result;
  }

  static mergeValue(target: any, source: any, props: string[] | string = null): any {
    let result: any = {};
    source = this.ignoreNullValue(source);
    if (props) {
      if (typeof props === 'string') {
        props = [props];
      }
      for (const i in target) {
        if (target.hasOwnProperty(i)) {
          result[i] = target[i];
          if (props.indexOf(i) >= 0 && source.hasOwnProperty(i)) {
            result[i] = source[i];
          }
        }
      }
    } else {
      result = this.clone(target);
      for (const i in target) {
        if (target.hasOwnProperty(i)) {
          result[i] = target[i];
          if (source.hasOwnProperty(i)) {
            result[i] = source[i];
          }
        }
      }
    }
    return result;
  }

  static combineValue(target: any, source: any, ignoreNull: boolean = true): any {
    if (ignoreNull) {
      source = this.ignoreNullValue(source);
    }
    return Object.assign(target, source);
  }

  static clone(source: any): Object {
    return JSON.parse(JSON.stringify(source));
  }

  static isNull(value: any) {
    if (typeof value === 'undefined' || value === null || value === undefined) {
      return true;
    }
    return false;
  }

  static isNotNull(value: any) {
    return !this.isNull(value);
  }

  static equals(o1: any, o2: any) {
    if (typeof o1 !== typeof o2) {
      return false;
    }
    return o1 === o2;
  }
}
