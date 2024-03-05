import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetGameService } from "../../../services/kwartet-game.service";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.scss'
})
export class EditGameComponent implements OnInit {

  /** The game that is being edited */
  @Input() kwartetGame?: KwartetGame

  constructor(private route: ActivatedRoute, private kwartetGameService: KwartetGameService) { }

  ngOnInit(): void {
    this.getKwartetGameFromService();
  }

  /**
   * Using the kwartet game uuid from the router and the {@link KwartetGameService}, retrieves a kwartet game
   */
  getKwartetGameFromService(): void {
    const uuid = String(this.route.snapshot.paramMap.get('uuid'));
    this.kwartetGame = this.kwartetGameService.getKwartetGameByUuid(uuid);
  }
}
