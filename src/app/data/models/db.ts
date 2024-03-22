import Dexie, { Table } from "dexie";
import { KwartetGame } from "./kwartetgame-model";
import { KwartetSet } from "./kwartetset-model";
import { KwartetCard } from "./kwartetcard-model";

export class AppDB extends Dexie {
  kwartetGames!: Table<KwartetGame, number>
  kwartetSets!: Table<KwartetSet, number>
  kwartetCards!: Table<KwartetCard, number>

  constructor() {
    super('kwartet');
    this.version(1).stores({
      kwartetGames: '++id',
      kwartetSets: '++id, kwartetGameId',
      kwartetCards: '++id, kwartetSetId'
    });
  }

}

export const db = new AppDB();
