import { Component, Input, OnInit } from '@angular/core';
import { AppModule } from "../../../app.module";
import { ActivatedRoute } from "@angular/router";
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetSet } from "../../../data/models/kwartetset-model";
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.scss'
})
export class EditGameComponent implements OnInit {

  /** The game that is being edited */
  @Input() kwartetGame?: KwartetGame

  constructor(private route: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit(): void {
    this.getKwartetGame();
  }

  /**
   * Using the router game id and the {@link GameService}, retrieves a kwartet game
   */
  getKwartetGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.storageService.getObject("games").subscribe()
  }
}
