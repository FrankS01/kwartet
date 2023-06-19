import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from "../../../../data/models/Game";
import { Set } from "../../../../data/models/Set";
import { GameService } from "../../../../data/services/game.service";

import { GAMES } from "../../../../data/mock-games";

@Component({
  selector: 'app-game-details-page',
  templateUrl: './game-details-page.component.html',
  styleUrls: ['./game-details-page.component.css']
})
export class GameDetailsPageComponent implements OnInit {
  @Input() game?: Game

  selectedSet?: Set;
  constructor(private route: ActivatedRoute, private gameService: GameService) {}
  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  onSetSelectionChange(set: Set): void {
    this.selectedSet = set;
  }
}
