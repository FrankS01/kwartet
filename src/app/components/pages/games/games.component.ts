import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../../services/local-storage.service";
import { KwartetGame } from "../../../data/models/KwartetGame";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: KwartetGame[] = [];

  constructor(private localStorageService: LocalStorageService) { }
  ngOnInit(): void {
    this.retrieveStoredGames();
  }

  /**
   * Retrieve stored games from local storage and cast them to the right object type
   */
  private retrieveStoredGames(): void {
    // If there are any games stored in local storage, retrieve them.
    if (this.localStorageService.getObject("games") != null) {
      this.games = this.localStorageService.getObject("games") as KwartetGame[];
    }
  }

  // Temp function to return list of numbers from 0 to n-1
  numSequence(n: number): Array<number> {
    return Array(n);
  }

  /**
   * Create a new game, add it to the list of games and store it in local storage.
   */
  createNewGame(): void {
    let game: KwartetGame = {
      name: "TestGame",
      sets: []
    }
    // Push to games array
    this.games.push(game);

    // Store updated game array in local storage
    this.localStorageService.storeObject("games", this.games)
  }


}
