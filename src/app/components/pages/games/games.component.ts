import { Component } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { MessageService } from "primeng/api";
import { FormControl, Validators } from "@angular/forms";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { liveQuery } from "dexie";
import { db } from "../../../data/models/db";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {

  // Used by the .html markup
  protected readonly GAME_TITLE_CHARACTER_LIMIT = GAME_TITLE_CHARACTER_LIMIT;

  // List of currently loaded games
  loadedGames$ = liveQuery(() => db.kwartetGames.toArray());

  // Whether the "create game" dialog is visible or not
  createGameDialogIsVisible: boolean = false;

  // Form value, used in "create game" dialog
  titleFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(GAME_TITLE_CHARACTER_LIMIT)]
  });

  constructor(private kwartetGameService: KwartetGameService, private messageService: MessageService) {
  }

  /**
   * Create a new game, add it to the list of games and store it.
   */
  private async createNewGame() {
    // Create game object
    let newGame: KwartetGame = {
      title: this.titleFormControl.value
    }

    // Create new game using service
    await this.kwartetGameService.createKwartetGame(newGame);

    // Show confirmation toast to user
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Game "${this.titleFormControl.value}" was succesfully created`
    });

    // Reset form value
    this.titleFormControl.reset();
  }

  showCreateGameDialog() {
    this.createGameDialogIsVisible = true;
  }

  async onClickCreateGameButton() {
    this.createGameDialogIsVisible = false;
    await this.createNewGame();
  }


}
