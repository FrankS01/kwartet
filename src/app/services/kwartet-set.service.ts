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
   * Create a new kwartet set
   * @param set The set to create
   */
  async createKwartetSet(set: KwartetSet) {
    return await db.kwartetSets.add(set);
  }


  /**
   * Using the kwartet set id, retrieves a single kwartet set
   * @param setId Id of the set to retrieve
   */
  async getKwartetSetById(setId: number) {
    return db.kwartetSets.where("id").equals(setId).first()
  }

  /**
   * Using the kwartet game id, retrieves an array of kwartet sets
   * @param gameId Id of the game to retrieve kwartet sets for
   */
  async getKwartetSetsByGameId(gameId: number) {
    return db.kwartetSets.where("kwartetGameId").equals(gameId).toArray()
  }

  /**
   * Updates an existing kwartet set
   * @param setToUpdate The kwartet set to update
   */
  async updateKwartetSet(setToUpdate: KwartetSet) {
    await db.kwartetSets.update(setToUpdate.id!, setToUpdate);
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
}
