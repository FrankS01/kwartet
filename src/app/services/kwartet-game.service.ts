import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { KwartetGame } from "../data/models/KwartetGame";
import { GAMES } from "../data/mock-games";

@Injectable({
  providedIn: 'root'
})
export class KwartetGameService {

  constructor() { }

  /** GET KwartetGame by id. Will 404 if id not found */
  getKwartetGame(id: number): Observable<KwartetGame> {
    // For now, assume that a kwartetgame-details-page with the specified `id` always exists.
    // TODO catch error

    const game = GAMES.find(g => g.id === id)!;
    return of(game);
  }
}
