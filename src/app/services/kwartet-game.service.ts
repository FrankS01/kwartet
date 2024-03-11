import { Injectable } from '@angular/core';
import { KwartetGame } from "../data/models/kwartetgame-model";
import { db } from "../data/models/db";

@Injectable({
  providedIn: 'root'
})
export class KwartetGameService {

  /**
   * Return all kwartet games
   */
  async getKwartetGames() {
    return db.kwartetGames.toArray();
  }

  /**
   * Using the kwartet game id, retrieves a single kwartet game
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
   * Deletes a kwartet game
   * @param gameToDeleteId Id of the game to delete
   */
  async deleteKwartetGame(gameToDeleteId: number) {
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
