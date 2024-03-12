import Dexie, { Table } from "dexie";
import { KwartetGame } from "./kwartetgame-model";
import { KwartetSet } from "./kwartetset-model";

export class AppDB extends Dexie {
  kwartetSets!: Table<KwartetSet, number>
  kwartetGames!: Table<KwartetGame, number>

  constructor() {
    super('kwartet');
    this.version(1).stores({
      kwartetGames: '++id',
      kwartetSets: '++id, kwartetGameId'
    });
  }

}

export const db = new AppDB();
