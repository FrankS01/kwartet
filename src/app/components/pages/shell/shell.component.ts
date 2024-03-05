import { Component } from '@angular/core';
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  title = 'Kwartet';

  constructor(private navigation: NavigationService) {
    this.navigation.startSavingNavigationHistory()
  }
}
