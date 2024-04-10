import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() showMenuButton: boolean = false;

  @Input() previousRoute: string = '';
  @Output() sideBarIsVisible = new EventEmitter<boolean>();

  // Property to hold the visibility state
  isSideBarVisible: boolean = false;

  constructor(private router: Router) { }
  goBack(route: string) {
    void this.router.navigateByUrl(route);
  }

  flipSidebarVisibility() {
    // Flip the visibility state
    this.isSideBarVisible = !this.isSideBarVisible;

    // Emit the updated visibility state
    this.sideBarIsVisible.emit(this.isSideBarVisible);
  }

}
