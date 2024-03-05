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
      games = retrievedGames as KwartetGame[];
    })
    return games;
  }

  /**
   * Using the kwartet game uuid, retrieves a single kwartet game
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
   * @param newGame The new kwartet game to be created
   */
  createKwartetGame(newGame: KwartetGame) {
    // Retrieve existing games
    let games: KwartetGame[] = this.getKwartetGames();

    // Push new game to games array
    games.push(newGame);

    // Store updated game array in storage
    this.storageService.storeObject("games", games).subscribe();
  }
}
