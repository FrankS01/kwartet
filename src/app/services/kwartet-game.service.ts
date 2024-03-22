import { Injectable } from '@angular/core';
import { KwartetGame } from "../data/models/kwartetgame-model";
import { db } from "../data/models/db";
import { KwartetSetService } from "./kwartet-set.service";
import { KwartetSet } from "../data/models/kwartetset-model";

@Injectable({
  providedIn: 'root'
})
export class KwartetGameService {

  constructor(private kwartetSetService: KwartetSetService) {}

  /**
   * Creates a new kwartet game and stores it
   * @param gameToCreate The new kwartet game to be created
   */
  async createKwartetGame(gameToCreate: KwartetGame) {
    db.kwartetGames.add(gameToCreate);
  }

  /**
   * Using the kwartet game id, retrieves a single kwartet game
   * @param gameId The kwartet game id of the game to retrieve
   */
  async getKwartetGameById(gameId: number) {
    return db.kwartetGames.where("id").equals(gameId).first();
  }

  /**
   * Update an existing kwartet game
   * @param updatedGame The updated kwartet game
   */
  async updateKwartetGame(updatedGame: KwartetGame) {
    await db.kwartetGames.update(updatedGame.id!, updatedGame);
  }

  /**
   * Deletes a kwartet game and all sets (and cards) belonging to it
   * @param gameToDeleteId Id of the game to delete
   */
  async deleteKwartetGame(gameToDeleteId: number) {
    // Find all kwartet sets belonging to this game
    let kwartetSets: KwartetSet[] = await this.kwartetSetService.getKwartetSetsByGameId(gameToDeleteId);

    // Loop through all kwartet sets and delete them one by one
    for (const kwartetSet of kwartetSets) {
      await this.kwartetSetService.deleteKwartetSet(kwartetSet.id!);
    }

    // Delete the kwartet game itself
    await db.kwartetGames.delete(gameToDeleteId)
  }

}
