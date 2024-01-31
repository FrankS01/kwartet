import { StorageStrategy } from "./StorageStrategy";
import { Observable, of, throwError } from "rxjs";

export class LocalStorageStrategy implements StorageStrategy {
  /**
   * Store an object in local storage
   * @param key
   * @param objectToStore
   */
  public storeObject(key: string, objectToStore: Object): Observable<Object> {
    if (!objectToStore) {
      localStorage.removeItem(key);
    }

    localStorage.setItem(key, JSON.stringify(objectToStore));
    return of(objectToStore);
  }

  public deleteObject(key: string): Observable<Object> {
    return new Observable(observer => {
      this.getObject(key).subscribe(object => {
        if (object == null) {
          observer.error(new Error("Delete failed as key does not exist"));
        } else {
          localStorage.removeItem(key);
          observer.next(object);
          observer.complete();
        }
      });
    });
  }

  public getObject(key: string): Observable<Object> {
    const stringifiedObject: string | null = localStorage.getItem(key);
    if (stringifiedObject == null) {
      throwError(() => new Error("There was no object found for this key"));
    }
    return of(JSON.parse(stringifiedObject!));
  }
}
