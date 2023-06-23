import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
/**
 * Contains the navigation toolbar
 */
export class NavigationComponent {

  constructor(private _location: Location) {}
}
