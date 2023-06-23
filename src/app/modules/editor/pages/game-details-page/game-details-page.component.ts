import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from "../../../../data/models/Game";
import { Set } from "../../../../data/models/Set";
import { GameService } from "../../../../data/services/game.service";

@Component({
  selector: 'app-game-details-page',
  templateUrl: './game-details-page.component.html',
  styleUrls: ['./game-details-page.component.css']
})
/**
 * Allows the user to edit an existing game.
 * Set details are edited through the {@link SetEditorComponent}.
 */
export class GameDetailsPageComponent implements OnInit {

  /** The game that is being edited */
  @Input() game?: Game

  /** The currently selected game set */
  selectedSet?: Set;
  constructor(private route: ActivatedRoute, private gameService: GameService) {}
  ngOnInit(): void {
    this.getGame();
  }

  /**
   * Using the router game id and the {@link GameService}, retrieves a game
   */
  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  /**
   * Creates a new unnamed set
   */
  createNewUnnamedSet(): void {
    if (!this.game) return;

    const newSet = {
      setName: 'Unnamed',
      card1Name: '',
      card2Name: '',
      card3Name: '',
      card4Name: ''
    };
    this.game?.sets?.push(newSet);
    this.selectedSet = newSet;
  }
}
