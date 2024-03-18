import { Component, Input, OnInit } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CARD_NAME_CHARACTER_LIMIT, SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-edit-kwartet-card',
  templateUrl: './edit-kwartet-card.component.html',
  styleUrl: './edit-kwartet-card.component.scss'
})
export class EditKwartetCardComponent implements OnInit {

  // Used by the .html markup
  protected readonly SET_TITLE_CHARACTER_LIMIT = SET_TITLE_CHARACTER_LIMIT;

  // The kwartet card that is currently being previewed by this component
  @Input() currentKwartetCard?: KwartetCard;

  // The full kwartet set that this card is a part of (this is needed because it is shown on the card as well)
  @Input() kwartetSet?: KwartetSet;

  // Whether the "edit card" dialog is visible or not
  editCardDialogIsVisible: boolean = false;

  // Whether the "edit" overlay should be shown
  showEditOverlay: boolean = false;

  editCardForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required,
        Validators.maxLength(CARD_NAME_CHARACTER_LIMIT)]
    }),
    coverImage: new FormControl<Blob | null>(null)
  })

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Fill in existing form values
    this.editCardForm.controls.name.setValue(this.currentKwartetCard!.name == 'Unnamed card' ? 'AAA' : 'B');
    this.editCardForm.controls.coverImage.setValue(this.currentKwartetCard!.coverImage!);
  }

  onCardPreviewClicked() {
    // Open dialog
    this.editCardDialogIsVisible = true;
  }

  async onClickSaveCardButton() {
    await this.saveCard();
    this.editCardDialogIsVisible = false;
  }


  async saveCard() {
    // TODO

    // Show confirmation toast to user
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Changes to the card have been saved.`
    });
  }
}
