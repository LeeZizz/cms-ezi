export class ArrayUtils {
  static isNotEmpty = (val: any) => {
    return (val && Array.isArray(val) && val.length > 0);
  }
}
