import { Component } from '@angular/core';
import { Game } from "../../../../data/models/Game";
import { GAMES } from "../../../../data/mock-games";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  games: Game[] = GAMES;

  constructor() {
  }

}
