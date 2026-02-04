export class StorageUtil {

  static get(key: string): string {
    return window.localStorage.getItem(key);
  }

  static set(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  static delete(key: string): void {
    window.localStorage.removeItem(key);
  }

  static clear(): void {
    window.localStorage.clear();
  }

  static setObject(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static getObject(key: string): any {
    return JSON.parse(StorageUtil.get(key));
  }

  static setUser(user: any) {
    StorageUtil.set('user', JSON.stringify(user));
  }

  static getUser(): { username: string, token: string, photoUrl: string, name: string, roles: string[] } {
    return JSON.parse(StorageUtil.get('user'));
  }

}
