import { Injectable } from '@angular/core';
import { db } from "../data/models/db";
import { KwartetCard } from "../data/models/kwartetcard-model";

@Injectable({
  providedIn: 'root'
})
export class KwartetCardService {

  constructor() { }

  /**
   * Creates a new kwartet card
   * @param card The card to create
   */
  async createKwartetCard(card: KwartetCard) {
    await db.kwartetCards.add(card);
  }

  /**
   * Using the kwartet set id, retrieves all kwartet cards for that set
   * @param setId Id of the set for which to retrieve the cards
   */
  async getKwartetCardsBySetId(setId: number) {
    return db.kwartetCards.where("kwartetSetId").equals(setId).toArray();
  }

  /**
   * Updates an existing kwartet card
   * @param cardToUpdate The kwartet card to update
   */
  async updateKwartetCard(cardToUpdate: KwartetCard) {
    await db.kwartetCards.update(cardToUpdate.id!, cardToUpdate)
  }

  /**
   * Deletes a kwartet card by id
   * @param cardId Id of the card to delete
   */
  async deleteKwartetCard(cardId: number) {
    await db.kwartetCards.delete(cardId);
  }
}
