import { Component } from '@angular/core';
import { Game } from "../../../../data/models/Game";
import { GAMES } from "../../../../data/mock-games";

@Component({
  selector: 'app-games-overview-page',
  templateUrl: './games-overview-page.component.html',
  styleUrls: ['./games-overview-page.component.css']
})
export class GamesOverviewPageComponent {
  games: Game[] = GAMES;

  constructor() {
  }

}
