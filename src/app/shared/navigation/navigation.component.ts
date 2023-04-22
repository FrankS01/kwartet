import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private _location: Location) {}
  // goBack(): void {
  //   this._location.back();
  // }
}
