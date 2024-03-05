import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private location: Location, private navigationService: NavigationService) { }
  goBack() {
    this.navigationService.goBack()
  }

}
