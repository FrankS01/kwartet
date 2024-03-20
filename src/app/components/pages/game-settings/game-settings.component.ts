import { Component, Input, OnInit } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { ActivatedRoute, Router } from "@angular/router";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { GAME_TITLE_CHARACTER_LIMIT } from "../../../config/global-settings";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss',
})
export class GameSettingsComponent implements OnInit {

  // Used by the .html markup
  protected readonly GAME_TITLE_CHARACTER_LIMIT = GAME_TITLE_CHARACTER_LIMIT;

  /** The game whose settings are being edited */
  @Input() kwartetGame?: KwartetGame

  @Input() kwartetSetAmount: number = 0;

  // Whether the "edit game title" dialog is visible or not
  editGameTitleDialogIsVisible: boolean = false;

  // Form value, used in "edit game title" dialog
  titleFormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required,
      Validators.maxLength(GAME_TITLE_CHARACTER_LIMIT)]
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private kwartetGameService: KwartetGameService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.autofillForm();
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this game? All data will be irretrievably lost.',
      header: `Deleting game ${this.kwartetGame?.title}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: async () => {
        await this.kwartetGameService.deleteKwartetGame(this.kwartetGame?.id!);
        this.router.navigateByUrl("/games").then(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Game deleted',
            detail: `Game "${this.kwartetGame?.title}" has been successfully deleted`
          })
        );
      }
    });
  }

  onEditGameTitleButtonClicked() {
    // Open dialog
    this.editGameTitleDialogIsVisible = true;
  }

  /**
   * Edit a game title
   * @private
   */
  private async editGameTitle() {
    this.kwartetGame!.title = this.titleFormControl.value;
    await this.kwartetGameService.updateKwartetGame(this.kwartetGame!).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Game title updated',
        detail: `Game title has been successfully changed to "${this.kwartetGame?.title}"`
      })
    });
  }

  async onClickEditGameTitleButton() {
    this.editGameTitleDialogIsVisible = false;
    await this.editGameTitle();
  }

  private autofillForm() {
    this.titleFormControl.setValue(this.kwartetGame?.title!);
  }
}
