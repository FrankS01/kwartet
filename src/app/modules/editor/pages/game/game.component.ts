import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from "../../../../data/models/Game";
import { GameService } from "../../../../data/services/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game?: Game;

  constructor(private route: ActivatedRoute, private gameService: GameService) {}
  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

}
