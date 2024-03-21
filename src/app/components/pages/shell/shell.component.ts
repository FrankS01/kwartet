import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  title = 'Kwartet';

  async ngOnInit() {
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
