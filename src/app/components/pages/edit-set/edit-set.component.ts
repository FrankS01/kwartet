import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { KwartetSetService } from "../../../services/kwartet-set.service";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { KwartetCardService } from "../../../services/kwartet-card.service";
import { FormControl, Validators } from "@angular/forms";
import { SET_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { Page } from "../../../data/models/page-enum";
import { ColorPickerChangeEvent } from "primeng/colorpicker";

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.scss'
})
export class EditSetComponent implements OnInit, OnChanges {

  // Used by the .html markup
  protected readonly SET_TITLE_CHARACTER_LIMIT = SET_TITLE_CHARACTER_LIMIT;

  @Output() changePage = new EventEmitter<Page>();

  @Input() currentSetId?: number;
  currentEditedSet?: KwartetSet

  kwartetCards: KwartetCard[] = []

  // Whether the "edit set name" dialog is visible or not
  editSetNameDialogIsVisible: boolean = false;

  // Form value, used in "edit set name" dialog
  nameFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(SET_TITLE_CHARACTER_LIMIT)]
  });

  currentColorpickerValue: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private kwartetGameService: KwartetGameService,
              private kwartetSetService: KwartetSetService,
              private kwartetCardService: KwartetCardService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  async ngOnInit() {
    await this.initialize()
  }

  async ngOnChanges() {
    await this.initialize();
  }

  async initialize() {
    await this.getCurrentEditedSet();
    await this.getKwartetCardsBySetId(this.currentEditedSet?.id!)
    this.autofillNameForm();
    this.autofillColorPickerAndColorValue();
  }

  async getCurrentEditedSet() {
    this.currentEditedSet = await this.kwartetSetService.getKwartetSetById(this.currentSetId!);
  }

  async getKwartetCardsBySetId(setId: number) {
    this.kwartetCards = await this.kwartetCardService.getKwartetCardsBySetId(setId);
  }

  async confirmDeleteSet(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this set? All data will be irretrievably lost.',
      header: `Deleting set ${this.currentEditedSet?.setName}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: async () => {
        await this.deleteCurrentEditedSet();
        this.messageService.add({
          severity: 'success',
          summary: 'Set deleted',
          detail: `Set "${this.currentEditedSet?.setName}" has been successfully deleted`
        })
        this.kwartetGameService.getKwartetGameById(this.currentEditedSet?.kwartetGameId!).then(() => {
          this.changePage.emit(Page.GameOverview);
        })
      }
    });
  }

  /**
   * Deletes the kwartet set that is currently being edited.
   */
  async deleteCurrentEditedSet() {
    await this.kwartetSetService.deleteKwartetSet(this.currentEditedSet?.id!)
  }

  /**
   * Edit a set name
   * @private
   */
  private async editSet() {
    await this.kwartetSetService.updateKwartetSet(this.currentEditedSet!).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Set updated',
        detail: `Set has been successfully updated`
      })
    });
  }

  onEditSetNameButtonClicked() {
    // Open dialog
    this.editSetNameDialogIsVisible = true;
  }

  async onClickEditSetNameButton() {
    this.editSetNameDialogIsVisible = false;
    this.currentEditedSet!.setName = this.nameFormControl.value;
    await this.editSet();
  }

  private autofillNameForm() {
    this.nameFormControl.setValue(this.currentEditedSet?.setName!);
  }

  async autofillColorPickerAndColorValue() {
    // If the set has a color
    if (this.currentEditedSet?.setColor) {
      this.currentColorpickerValue = this.currentEditedSet?.setColor!
    }

    // If the set doesn't have a color property (for sets created before colors were added)
    else {
      this.currentColorpickerValue = "#60a5fa" // Default color for new sets
      await this.saveColorPickerSetColor();
    }
  }

  /**
   * Update the color in the current edited set and store it using service
   */
  async saveColorPickerSetColor() {
    this.currentEditedSet!.setColor = this.currentColorpickerValue;
    await this.kwartetSetService.updateKwartetSet(this.currentEditedSet!).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Set color updated',
        detail: `Set color has been successfully updated`,
        life: 1000
      })
    });
  }
}
