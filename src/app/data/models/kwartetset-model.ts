import { KwartetCard } from "./kwartetcard-model";

export interface KwartetSet {
  id?: number;
  kwartetGameId: number;
  setName: string;
  card1: KwartetCard;
  card2: KwartetCard;
  card3: KwartetCard;
  card4: KwartetCard;
}
