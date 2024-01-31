import { Component, OnInit } from '@angular/core';
import { KwartetGame } from "../../../data/models/KwartetGame";
import { MessageService } from "primeng/api";
import { FormControl, Validators } from "@angular/forms";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { StorageService } from "../../../services/storage.service";

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

  constructor(private storageService: StorageService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveStoredGames();
  }

  /**
   * Retrieve stored games and cast them to the right object type
   */
  private retrieveStoredGames(): void {
    // If there are any games stored, retrieve them.
    this.storageService.getObject("games").subscribe(games => {
      if (games != null) {
        this.loadedGames = games as KwartetGame[];
      }
    });
  }

  /**
   * Create a new game, add it to the list of games and store it.
   */
  private createNewGame(): void {
    // Create game object
    let game: KwartetGame = {
      title: this.titleFormControl.value,
      sets: []
    }
    // Push to loaded games array
    this.loadedGames.push(game);

    // Store updated game array in storage
    this.storageService.storeObject("games", this.loadedGames).subscribe();

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
