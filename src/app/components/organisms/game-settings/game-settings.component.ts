import { Component, Input, OnInit } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss'
})
export class GameSettingsComponent implements OnInit {

  /** The game whose settings are being edited */
  @Input() kwartetGame?: KwartetGame

  ngOnInit(): void {

  }
}
