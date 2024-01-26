import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../../services/local-storage.service";
import { KwartetGame } from "../../../data/models/KwartetGame";
import { MessageService } from "primeng/api";
import { FormControl, Validators } from "@angular/forms";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  providers: [MessageService],
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

  constructor(private localStorageService: LocalStorageService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.retrieveStoredGames();
  }

  /**
   * Retrieve stored games from local storage and cast them to the right object type
   */
  private retrieveStoredGames(): void {
    // If there are any games stored in local storage, retrieve them.
    if (this.localStorageService.getObject("games") != null) {
      this.loadedGames = this.localStorageService.getObject("games") as KwartetGame[];
    }
  }

  /**
   * Create a new game, add it to the list of games and store it in local storage.
   */
  private createNewGame(): void {
    // Create game object
    let game: KwartetGame = {
      title: this.titleFormControl.value,
      sets: []
    }
    // Push to loaded games array
    this.loadedGames.push(game);

    // Store updated game array in local storage
    this.localStorageService.storeObject("games", this.loadedGames);

    // Show confirmation toast to user
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Game ${ this.titleFormControl.value } was succesfully created.` });

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
