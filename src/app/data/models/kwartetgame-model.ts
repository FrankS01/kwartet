import { KwartetSet } from './kwartetset-model';

/**
 * A game of quartets
 */
export interface KwartetGame {
  id?: number;
  title: string;
  sets: KwartetSet[];
}
