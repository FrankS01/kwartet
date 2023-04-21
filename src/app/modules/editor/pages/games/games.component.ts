import { Component } from '@angular/core';
import { GameComponent } from "../../content/game/game.component";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  games: GameComponent[] = [
    { id: 1, name: 'Spelletje'},
    { id: 2, name: 'Spelletje'},
    { id: 3, name: 'Spelletje'}
  ];

  constructor() {
  }

}
