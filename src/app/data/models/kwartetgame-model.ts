import { KwartetSet } from './kwartetset-model';

/**
 * A game of quartets
 */
export interface KwartetGame {
  uuid: string;
  title: string;
  sets: KwartetSet[];
}
