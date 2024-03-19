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
   * Return all kwartet games
   */
  async getKwartetGames() {
    return db.kwartetGames.toArray();
  }

  /**
   * Using the kwartet game id, retrieves a single kwartet game
   * @param id The kwartet game id to retrieve
   */
  async getKwartetGameById(id: number) {
    return db.kwartetGames.where("id").equals(id).first();
  }

  /**
   * Creates a new kwartet game and stores it
   * @param gameToCreate The new kwartet game to be created
   */
  async createKwartetGame(gameToCreate: KwartetGame) {
    db.kwartetGames.add(gameToCreate);
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

  /**
   * Update an existing kwartet game
   * @param updatedGame The updated kwartet game
   */
  async updateKwartetGame(updatedGame: KwartetGame) {
    await db.kwartetGames.update(updatedGame.id!, updatedGame);
  }
}
