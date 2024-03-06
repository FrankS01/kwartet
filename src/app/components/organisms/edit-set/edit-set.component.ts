import { Component, Input, OnInit } from '@angular/core';
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";

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
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getKwartetGameFromService();
    this.getCurrentEditedSet();
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  getKwartetGameFromService(): void {
    const uuid = String(this.route.snapshot.parent?.paramMap.get('game-uuid'));
    this.kwartetGame = this.kwartetGameService.getKwartetGameByUuid(uuid);
  }

  getCurrentEditedSet(): void {
    // If there is no kwartet game loaded, its set can't be retrieved
    if (this.kwartetGame == undefined) return;

    let setUuid = String(this.route.snapshot.paramMap.get('set-uuid'));
    this.currentEditedSet = this.kwartetGame?.sets.find(set => set.uuid == setUuid);
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this set? All data will be irretrievably lost.',
      header: `Deleting set ${this.currentEditedSet?.setName}`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteCurrentEditedSet();
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
  deleteCurrentEditedSet() {
    // If there is no kwartet game loaded, its set can't be deleted
    if (this.kwartetGame == undefined) return;

    const indexToDelete: number = this.kwartetGame?.sets?.findIndex(set => set.uuid == this.currentEditedSet?.uuid);
    // If the set with the provided UUID exists and the sets array has been loaded
    if (indexToDelete !== -1 && this.kwartetGame?.sets != undefined) {

      // Delete the set from the kwartet game set array
      this.kwartetGame?.sets.splice(indexToDelete, 1);

    }
    this.kwartetGameService.updateKwartetGame(this.kwartetGame);
  }
}
