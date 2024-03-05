import { Injectable } from '@angular/core';
import { KwartetGame } from "../data/models/kwartetgame-model";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class KwartetGameService {

  constructor(private storageService: StorageService) {
  }

  /**
   * Return all kwartet games using the {@link StorageService}
   */
  getKwartetGames(): KwartetGame[] {
    let games: KwartetGame[] = [];
    this.storageService.getObject("games").subscribe(retrievedGames => {
      if (retrievedGames != null) {
        games = retrievedGames as KwartetGame[];

      }
    })
    return games;
  }

  /**
   * Using the kwartet game UUID, retrieves a single kwartet game
   */
  getKwartetGameByUuid(uuid: string): KwartetGame {
    const games: KwartetGame[] = this.getKwartetGames();
    const game = games.find(game => game.uuid == uuid);

    if (!game) {
      throw new Error(`KwartetGame with UUID ${uuid} was not found`);
    }

    return game;
  }

  /**
   * Creates a new kwartet game and stores it using the {@link StorageService}
   * @param gameToCreate The new kwartet game to be created
   */
  createKwartetGame(gameToCreate: KwartetGame) {
    // Retrieve existing games
    let games: KwartetGame[] = this.getKwartetGames();

    // Push new game to games array
    games.push(gameToCreate);

    // Store updated game array in storage
    this.storageService.storeObject("games", games).subscribe();
  }

  /**
   * Deletes a kwartet game
   * @param gameToDeleteUuid UUID of the game to delete
   */
  deleteKwartetGame(gameToDeleteUuid: string) {
    // Retrieve existing games
    let games: KwartetGame[] = this.getKwartetGames();

    // Find the index of the game to delete
    const indexToDelete: number = games.findIndex(game => game.uuid === gameToDeleteUuid);

    // If the game with the provided UUID exists
    if (indexToDelete !== -1) {
      // Delete the game from the array
      games.splice(indexToDelete, 1);

      // Store updated game array in storage
      this.storageService.storeObject("games", games).subscribe();

    } else {
      throw new Error(`KwartetGame with UUID ${gameToDeleteUuid} was not found`);
    }
  }

  /**
   * Update an existing kwartet game
   * @param updatedGame
   */
  updateKwartetGame(updatedGame: KwartetGame) {
    // Retrieve existing games
    let games: KwartetGame[] = this.getKwartetGames();

    // Find the index of the game to update
    const indexToUpdate: number = games.findIndex(game => game.uuid === updatedGame.uuid);

    // Update game
    games[indexToUpdate] = updatedGame;

    // Store updated game array in storage
    this.storageService.storeObject("games", games).subscribe();
  }
}
