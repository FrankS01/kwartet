import Dexie, { Table } from "dexie";
import { KwartetGame } from "./kwartetgame-model";

export class AppDB extends Dexie {
  kwartetGames!: Table<KwartetGame, number>

  constructor() {
    super('kwartet');
    this.version(3).stores({
      kwartetGames: '++id',
    });
  }

}

export const db = new AppDB();
