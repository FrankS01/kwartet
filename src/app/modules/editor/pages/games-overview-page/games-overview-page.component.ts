import { Component } from '@angular/core';
import { Game } from "../../../../data/models/Game";
import { GAMES } from "../../../../data/mock-games";

@Component({
  selector: 'app-games-overview-page',
  templateUrl: './games-overview-page.component.html',
  styleUrls: ['./games-overview-page.component.css']
})

/**
 * Allows the user to manage different games.
 */
export class GamesOverviewPageComponent {
  // TODO Don't use mock games
  games: Game[] = GAMES;

  constructor() {
  }

}
