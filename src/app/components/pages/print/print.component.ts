import { Component, Input } from '@angular/core';
import { KwartetGame } from "../../../data/models/kwartetgame-model";
import { KwartetSet } from "../../../data/models/kwartetset-model";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrl: './print.component.scss'
})
export class PrintComponent {

  /** The game whose sets are being printed */
  @Input() kwartetGame?: KwartetGame

  /** The sets belonging to this game */
  @Input() kwartetSets?: KwartetSet[] | null

}
