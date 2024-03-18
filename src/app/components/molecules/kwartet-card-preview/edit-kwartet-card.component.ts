import { Component, Input } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { FormControl, Validators } from "@angular/forms";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";

@Component({
  selector: 'app-kwartet-card-preview',
  templateUrl: './edit-kwartet-card.component.html',
  styleUrl: './edit-kwartet-card.component.scss'
})
export class EditKwartetCardComponent {

  // The kwartet card that is currently being previewed by this component
  @Input() currentKwartetCard?: KwartetCard;

  // The full kwartet set that this card is a part of (this is needed because it is shown on the card as well)
  @Input() kwartetSet?: KwartetSet;

  // Whether the "edit card" dialog is visible or not
  editCardDialogIsVisible: boolean = false;

  // Whether the "edit" overlay should be shown
  showEditOverlay: boolean = false;

  // TODO
  cardFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(GAME_TITLE_CHARACTER_LIMIT)]
  });

  onCardClicked() {
    // Open dialog
    this.editCardDialogIsVisible = true;
  }

  async onClickSaveCardButton() {
    this.editCardDialogIsVisible = false;
    await this.saveCard();
  }

  async saveCard() {
    // TODO
  }
}
