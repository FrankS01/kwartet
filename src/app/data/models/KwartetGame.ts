import { KwartetSet } from './KwartetSet';

/**
 * A game of quartets
 */
export interface KwartetGame {
  title: string;
  sets: KwartetSet[];
}
