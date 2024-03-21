import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrl: './print.component.scss'
})
export class PrintComponent {

  /** The game that is being printed */
  @Input() gameId?: number

  constructor(private router: Router) { }

  onClickPrintButton() {
    void this.router.navigateByUrl("/print/" + this.gameId!);
  }
}
