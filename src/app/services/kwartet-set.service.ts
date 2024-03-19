import { Injectable } from '@angular/core';
import { db } from "../data/models/db";
import { KwartetSet } from "../data/models/kwartetset-model";
import { KwartetCardService } from "./kwartet-card.service";
import { KwartetCard } from "../data/models/kwartetcard-model";

@Injectable({
  providedIn: 'root'
})
export class KwartetSetService {

  constructor(private kwartetCardService: KwartetCardService) {}

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
   * Deletes a kwartet set and the cards that belong to it
   * @param setId Id of the set to delete
   */
  async deleteKwartetSet(setId: number) {
    // Find all kwartet cards belonging to this set
    let kwartetCards: KwartetCard[] = await this.kwartetCardService.getKwartetCardsBySetId(setId)

    // Loop through all kwartet cards and delete them one by one
    for (const kwartetCard of kwartetCards) {
      await this.kwartetCardService.deleteKwartetCard(kwartetCard.id!);
    }

    // Delete the kwartet set itself
    await db.kwartetSets.delete(setId)
  }

  async createKwartetSet(set: KwartetSet) {
    return await db.kwartetSets.add(set);
  }
}
