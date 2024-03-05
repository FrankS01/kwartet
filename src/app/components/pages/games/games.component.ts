import { Component, OnInit } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { MessageService } from "primeng/api";
import { FormControl, Validators } from "@angular/forms";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import * as uuid from 'uuid';
import { KwartetGameService } from "../../../services/kwartet-game.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {

  // List of currently loaded games
  loadedGames: KwartetGame[] = [];

  // Whether the "create game" dialog is visible or not
  createGameDialogIsVisible: boolean = false;

  // Form value, used in "create game" dialog
  titleFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(GAME_TITLE_CHARACTER_LIMIT)]
  });

  constructor(private kwartetGameService: KwartetGameService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveStoredGamesFromService();
  }

  /**
   * Retrieve stored games and cast them to the right object type
   */
  private retrieveStoredGamesFromService(): void {
    this.loadedGames = this.kwartetGameService.getKwartetGames();
  }

  /**
   * Create a new game, add it to the list of games and store it.
   */
  private createNewGame(): void {
    // Create game object
    let newGame: KwartetGame = {
      uuid: uuid.v4(),
      title: this.titleFormControl.value,
      sets: []
    }

    // Create new game using service
    this.kwartetGameService.createKwartetGame(newGame);

    // Update currently loaded games array with new game
    // (by only adding this game instead of retrieving the entire array, the flip animation only plays on this game)
    this.loadedGames.push(newGame)

    // Show confirmation toast to user
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Game "${ this.titleFormControl.value }" was succesfully created.` });

    // Reset form value
    this.titleFormControl.reset();
  }

  showCreateGameDialog() {
    this.createGameDialogIsVisible = true;
  }

  onClickCreateGameButton() {
    this.createGameDialogIsVisible = false;
    this.createNewGame();
  }

}
