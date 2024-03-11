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

  async ngOnInit() {
    // Allows for ngOnInit to be called on routing to the same routing Component since we will never reuse a route
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    // Persist IndexedDB storage
    await this.persistIndexedDb().then(async (persisted) => {
      if (persisted) {
        console.log('Storage persisted');
      } else {
        console.log('Storage not persisted');
      }
    });
  }

  /**
   * Make sure that IndexedDB persists the storage
   */
  async persistIndexedDb() {
    return await navigator.storage && navigator.storage.persist &&
      navigator.storage.persist();
  }
}
