import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from "../../../../data/models/Game";
import { GameService } from "../../../../data/services/game.service";

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GAMES } from "../../../../data/mock-games";

@Component({
  selector: 'app-game-details-page',
  templateUrl: './game-details-page.component.html',
  styleUrls: ['./game-details-page.component.css']
})
export class GameDetailsPageComponent implements OnInit {
  @Input() game?: Game
  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute, private gameService: GameService) {}
  ngOnInit(): void {
    this.getGame();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => this.game = game);
  }

  protected readonly GAMES = GAMES;
}
