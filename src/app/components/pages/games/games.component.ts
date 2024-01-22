import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../../services/local-storage.service";
import { KwartetGame } from "../../../data/models/KwartetGame";
import { MessageService } from "primeng/api";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  providers: [MessageService],
})
export class GamesComponent implements OnInit {
  games: KwartetGame[] = [];
  createGameDialogIsVisible: boolean = false;

  // Form values
  name = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.maxLength(17)]
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
      this.games = this.localStorageService.getObject("games") as KwartetGame[];
    }
  }

  /**
   * Create a new game, add it to the list of games and store it in local storage.
   */
  private createNewGame(): void {
    let game: KwartetGame = {
      name: this.name.value,
      sets: []
    }
    // Push to games array
    this.games.push(game);

    // Store updated game array in local storage
    this.localStorageService.storeObject("games", this.games);

    // Show confirmation toast
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Game was succesfully created.'});

    // Reset form value
    this.name.reset();
  }

  showCreateGameDialog() {
    this.createGameDialogIsVisible = true;
  }

  onClickCreateGameButton() {
    this.createGameDialogIsVisible = false;
    this.createNewGame();
  }

}
