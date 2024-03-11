import { Component, Input, OnInit } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { ActivatedRoute, Router } from "@angular/router";
import { KwartetGameService } from "../../../services/kwartet-game.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss',
})
export class GameSettingsComponent implements OnInit {

  /** The game whose settings are being edited */
  @Input() kwartetGame?: KwartetGame

  constructor(private route: ActivatedRoute,
              private router: Router,
              private kwartetGameService: KwartetGameService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  async ngOnInit() {
    await this.getKwartetGameFromService()
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  async getKwartetGameFromService() {
    const id: number = Number(this.route.snapshot.parent?.paramMap.get('game-id'));
    this.kwartetGame = await this.kwartetGameService.getKwartetGameById(id);
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
            summary: 'Deleted game',
            detail: `Game "${this.kwartetGame?.title}" has been successfully deleted`
          })
        );
      }
    });
  }
}
