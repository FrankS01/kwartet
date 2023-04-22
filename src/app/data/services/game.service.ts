import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Game } from "../models/Game";
import { GAMES } from "../mock-games";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  /** GET hero by id. Will 404 if id not found */
  getGame(id: number): Observable<Game> {
    // For now, assume that a game with the specified `id` always exists.
    // TODO catch error

    const game = GAMES.find(g => g.id === id)!;
    return of(game);
  }

}
