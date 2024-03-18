import { Injectable } from '@angular/core';
import { db } from "../data/models/db";
import { KwartetSet } from "../data/models/kwartetset-model";

@Injectable({
  providedIn: 'root'
})
export class KwartetSetService {

  /**
   * Using the kwartet set id, retrieves a single kwartet set
   */
  async getKwartetSetById(id: number) {
    return db.kwartetSets.where("id").equals(id).first()
  }

  async getKwartetSetsByGameId(gameId: number) {
    return db.kwartetSets.where("kwartetGameId").equals(gameId).toArray()
  }

  /**
   * Deletes a kwartet set
   * @param setId Id of the set to delete
   */
  async deleteKwartetSet(setId: number) {
    await db.kwartetSets.delete(setId)
  }

  async createKwartetSet(set: KwartetSet) {
    return await db.kwartetSets.add(set);
  }
}
