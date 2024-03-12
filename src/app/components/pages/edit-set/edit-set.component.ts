import { Component, Input, OnInit } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { KwartetSetService } from "../../../services/kwartet-set.service";

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.scss'
})
export class EditSetComponent implements OnInit {
  /** The game whose set is being edited */
  @Input() kwartetGame?: KwartetGame

  currentEditedSet?: KwartetSet

  constructor(private route: ActivatedRoute,
              private router: Router,
              private kwartetGameService: KwartetGameService,
              private kwartetSetService: KwartetSetService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  async ngOnInit() {
    await this.getKwartetGameFromService();
    await this.getCurrentEditedSet();
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  async getKwartetGameFromService() {
    const id: number = Number(this.route.snapshot.parent?.paramMap.get('game-id'));
    this.kwartetGame = await this.kwartetGameService.getKwartetGameById(id);
  }

  async getCurrentEditedSet() {
    const id: number = Number(this.route.snapshot.paramMap.get('set-id'));
    this.currentEditedSet = await this.kwartetSetService.getKwartetSetById(id);
  }

  async confirmDelete(event: Event) {
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
        this.router.navigate(['../../settings'], {relativeTo: this.route}).then(() =>
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted set',
            detail: `Set "${this.currentEditedSet?.setName}" has been successfully deleted`
          })
        );
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
