import { KwartetSet } from './KwartetSet';

/**
 * A game of quartets
 */
export interface KwartetGame {
  id: number;
  name: string;
  sets: KwartetSet[];
}
