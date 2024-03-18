import { Component, Input, OnInit } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CARD_NAME_CHARACTER_LIMIT, SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { MessageService } from "primeng/api";
import { KwartetCardService } from "../../../services/kwartet-card.service";

@Component({
  selector: 'app-edit-kwartet-card',
  templateUrl: './edit-kwartet-card.component.html',
  styleUrl: './edit-kwartet-card.component.scss'
})
export class EditKwartetCardComponent implements OnInit {

  // Used by the .html markup
  protected readonly SET_TITLE_CHARACTER_LIMIT = SET_TITLE_CHARACTER_LIMIT;

  // The full kwartet set that this card is a part of
  @Input() kwartetSet?: KwartetSet;

  // All kwartet cards that are part of this kwartet set
  @Input() kwartetCards?: KwartetCard[];

  // The kwartet card that is currently being previewed by this component
  @Input() currentKwartetCard?: KwartetCard;

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
    coverImage: new FormControl<Blob | null>(null, {
      nonNullable: false,
    })
  })

  constructor(private messageService: MessageService,
              private kwartetCardService: KwartetCardService) {
  }

  ngOnInit(): void {
    // Fill in existing form values

    // If the name of the card is "Unnamed card", don't set a value.
    this.editCardForm.controls.name.setValue(this.currentKwartetCard!.name == 'Unnamed card' ? '' : this.currentKwartetCard!.name);
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
    let updatedCard = this.currentKwartetCard!;
    updatedCard.name = this.editCardForm.controls.name.value;
    if (this.editCardForm.controls.coverImage) {
      updatedCard.coverImage = this.editCardForm.controls.coverImage.value!
    }

    await this.kwartetCardService.updateKwartetCard(updatedCard).then(() => {
        // Show confirmation toast to user
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Changes to the card have been saved.`
        });
    },
    );

  }
}
