import { Component, Input } from '@angular/core';
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { FormControl, Validators } from "@angular/forms";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";

@Component({
  selector: 'app-edit-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrl: './edit-card-dialog.component.scss'
})
export class EditCardDialogComponent {

  // Whether the "edit card" dialog is visible or not
  @Input() editCardDialogIsVisible: boolean = false;

  @Input() currentEditedCard?: KwartetCard;

  // TODO
  cardFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(GAME_TITLE_CHARACTER_LIMIT)]
  });

  async onClickSaveCardButton() {
    this.editCardDialogIsVisible = false;
    await this.saveCard();
  }

  async saveCard() {
    // TODO
  }
}
