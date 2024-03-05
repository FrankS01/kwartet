import { Component, Input, OnInit } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { ActivatedRoute } from "@angular/router";
import { KwartetGameService } from "../../../services/kwartet-game.service";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss'
})
export class GameSettingsComponent implements OnInit {

  /** The game whose settings are being edited */
  @Input() kwartetGame?: KwartetGame

  constructor(private route: ActivatedRoute, private kwartetGameService: KwartetGameService) { }

  ngOnInit(): void {
    this.getKwartetGameFromService()
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  getKwartetGameFromService(): void {
    const uuid = String(this.route.snapshot.parent?.paramMap.get('uuid'));
    this.kwartetGame = this.kwartetGameService.getKwartetGameByUuid(uuid);
  }
}
