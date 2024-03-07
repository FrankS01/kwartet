import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  title = 'Kwartet';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Allows for ngOnInit to be called on routing to the same routing Component since we will never reuse a route
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
}
