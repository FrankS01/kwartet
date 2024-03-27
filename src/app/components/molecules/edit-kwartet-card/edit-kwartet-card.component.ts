import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  CARD_COVER_FILE_SIZE,
  CARD_NAME_CHARACTER_LIMIT,
  SET_TITLE_CHARACTER_LIMIT
} from "../../../config/global-settings";
import { MessageService } from "primeng/api";
import { KwartetCardService } from "../../../services/kwartet-card.service";
import { FileSelectEvent, FileUpload } from "primeng/fileupload";
import { Ng2ImgMaxService } from "ng2-img-max";
import fontColorContrast from "font-color-contrast";

@Component({
  selector: 'app-edit-kwartet-card',
  templateUrl: './edit-kwartet-card.component.html',
  styleUrl: './edit-kwartet-card.component.scss'
})
export class EditKwartetCardComponent implements OnInit {

  // Used by the .html markup
  protected readonly CARD_COVER_FILE_SIZE = CARD_COVER_FILE_SIZE;
  protected readonly SET_TITLE_CHARACTER_LIMIT = SET_TITLE_CHARACTER_LIMIT;
  protected readonly fontColorContrast = fontColorContrast;

  // The full kwartet set that this card is a part of
  @Input() kwartetSet?: KwartetSet;

  // All kwartet cards that are part of this kwartet set
  @Input() kwartetCards?: KwartetCard[];

  // The kwartet card that is currently being previewed by this component
  @Input() currentKwartetCard?: KwartetCard;

  // The card number in the set of the currentKwartetCard (1, 2, 3 or 4)
  @Input() kwartetCardNumber?: number;

  // Reference to the file upload component
  @ViewChild('fileUploadButton') fileUploadButton?: FileUpload;

  // Whether the "edit card" dialog is visible or not
  editCardDialogIsVisible: boolean = false;

  // Whether the "edit" overlay should be shown
  showEditOverlay: boolean = false;

  // Whether the progress spinner in the edit card dialog should be shown
  showProgressSpinner: boolean = false;

  // Used on the card preview
  existingCoverImageUrl: string = '';

  // Used when editing a card
  temporaryCoverImageUrl: string = '';

  editCardForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(CARD_NAME_CHARACTER_LIMIT)]
    }),
    coverImage: new FormControl<File | null>(null)
  })

  constructor(private messageService: MessageService,
              private kwartetCardService: KwartetCardService,
              private imageCompressService: Ng2ImgMaxService) {
  }

  ngOnInit(): void {
    // Fill in existing form values
    this.autofillForm()

    // Generate existing cover image url
    this.generateExistingCoverImageUrl();
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

    // Show confirmation toast to user
    await this.kwartetCardService.updateKwartetCard(updatedCard).then(() => {
        // Show confirmation toast to user
        this.messageService.add({
          severity: 'success',
          summary: 'Card updated',
          detail: `Changes to card ${this.kwartetCardNumber} have been saved`,
          life: 1500
        });
      },
    );

    // Reset form
    this.resetEditCardForm();

    // Update card cover
    this.generateExistingCoverImageUrl()
  }


  onSelectCoverImage($event: FileSelectEvent) {
    this.showProgressSpinner = true;
    let file = $event.files[0];
    this.imageCompressService.compressImage(file, 1).subscribe({
      next: file => {
        this.showProgressSpinner = false;
        this.editCardForm.controls.coverImage.setValue(file as File)
        this.generateTemporaryCoverImageUrl();
      }
    });

  }

  /**
   * Generates a new cover image url (used for the card preview) if a cover exists for this card
   */
  generateExistingCoverImageUrl() {
    if (this.currentKwartetCard?.coverImage) {
      this.existingCoverImageUrl = URL.createObjectURL(this.currentKwartetCard?.coverImage!)
    }
  }

  /**
   * Generates a temporary cover image url (used in the edit card popup) if a cover exists for this card
   */
  generateTemporaryCoverImageUrl() {
    if (this.editCardForm.controls.coverImage.value) {
      this.temporaryCoverImageUrl = URL.createObjectURL(this.editCardForm.controls.coverImage.value!)
    }
  }

  onHideDialog() {
    this.resetEditCardForm();
  }

  /**
   * Resets the edit card form to their default values
   */
  resetEditCardForm() {

    // Reset form group
    this.editCardForm.reset();

    // Reset upload button
    this.fileUploadButton!.clear();

    // Autofill the form
    this.autofillForm();

  }

  autofillForm() {
    // If the name of the card is not set yet, don't set a value.
    this.editCardForm.controls.name.setValue(this.currentKwartetCard!.name == undefined ? '' : this.currentKwartetCard!.name);

    if (this.currentKwartetCard!.coverImage) {
      this.editCardForm.controls.coverImage.setValue(this.currentKwartetCard!.coverImage);
      this.generateTemporaryCoverImageUrl();
    }
  }
}
