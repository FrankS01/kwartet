import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() previousRoute: string = '';

  constructor(private router: Router) { }
  goBack(route: string) {
    void this.router.navigateByUrl(route);
  }

}
