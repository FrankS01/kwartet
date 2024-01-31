import { Observable } from "rxjs";

export interface StorageStrategy {
  storeObject(key: string, objectToStore: Object): Observable<Object>;
  deleteObject(key: string): Observable<Object>
  getObject(key: string): Observable<Object>
}
