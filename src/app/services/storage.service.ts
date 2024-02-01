import { Injectable } from '@angular/core';
import { StorageStrategy } from "../data/models/storage-strategy/storage-strategy";
import { STORAGE_STRATEGY } from "../config/global-settings";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storageStrategy: StorageStrategy;
  constructor() {
    this.storageStrategy = STORAGE_STRATEGY;
  }

  storeObject(key: string, objectToStore: Object): Observable<Object> {
    return this.storageStrategy.storeObject(key, objectToStore);
  }
  deleteObject(key: string): Observable<Object> {
    return this.storageStrategy.deleteObject(key);
  }
  getObject(key: string): Observable<Object> {
    return this.storageStrategy.getObject(key);
  }
}
