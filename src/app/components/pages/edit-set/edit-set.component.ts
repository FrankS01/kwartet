import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { KwartetSetService } from "../../../services/kwartet-set.service";
import { KwartetCard } from "../../../data/models/kwartetcard-model";
import { KwartetCardService } from "../../../services/kwartet-card.service";

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.scss'
})
export class EditSetComponent implements OnInit, OnChanges {

  @Input() currentSetId?: number;
  currentEditedSet?: KwartetSet

  kwartetCards: KwartetCard[] = []

  constructor(private route: ActivatedRoute,
              private router: Router,
              private kwartetGameService: KwartetGameService,
              private kwartetSetService: KwartetSetService,
              private kwartetCardService: KwartetCardService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  async ngOnInit() {
    await this.getCurrentEditedSet();
    await this.getKwartetCardsBySetId(this.currentEditedSet?.id!)
  }

  async ngOnChanges() {
    await this.getCurrentEditedSet();
    await this.getKwartetCardsBySetId(this.currentEditedSet?.id!)
  }

  async getCurrentEditedSet() {
    this.currentEditedSet = await this.kwartetSetService.getKwartetSetById(this.currentSetId!);
  }

  async getKwartetCardsBySetId(setId: number) {
    this.kwartetCards =  await this.kwartetCardService.getKwartetCardsBySetId(setId);
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
        this.kwartetGameService.getKwartetGameById(this.currentEditedSet?.kwartetGameId!).then(game => {
          void this.router.navigateByUrl("edit-game/" + game?.id!);
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
}
