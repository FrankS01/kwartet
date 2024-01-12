import { KwartetSet } from './KwartetSet';

/**
 * A game of quartets
 */
export interface KwartetGame {
  name: string;
  sets: KwartetSet[];
}
