import { Injectable } from '@angular/core';
import { db } from "../data/models/db";
import { KwartetCard } from "../data/models/kwartetcard-model";

@Injectable({
  providedIn: 'root'
})
export class KwartetCardService {

  constructor() { }

  async createKwartetCard(card: KwartetCard) {
    await db.kwartetCards.add(card);
  }

  async getKwartetCardsBySetId(setId: number) {
    return db.kwartetCards.where("kwartetSetId").equals(setId).toArray();
  }

  async updateKwartetCard(cardToUpdate: KwartetCard) {
    await db.kwartetCards.update(cardToUpdate.id!, cardToUpdate)
  }
}
