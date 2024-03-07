import { KwartetCard } from "./kwartetcard-model";

export interface KwartetSet {
  uuid: string;
  setName: string;
  card1: KwartetCard;
  card2: KwartetCard;
  card3: KwartetCard;
  card4: KwartetCard;
}
