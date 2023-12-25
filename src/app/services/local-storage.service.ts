import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Store an object in local storage
   * @param key
   * @param objectToStore
   */
  public storeObject(key: string, objectToStore: Object): void {
    if (!objectToStore) {
      localStorage.removeItem(key);
    }

    localStorage.setItem(key, JSON.stringify(objectToStore));
  }

  public clearObject(key: string): void {
    localStorage.removeItem(key);
  }

  public getObject(key: string): Object {
    const stringifiedObject = localStorage.getItem(key);
    return stringifiedObject ? JSON.parse(stringifiedObject) : null;
  }

}
