import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import { EditorRoutingModule } from './editor-routing.module';
import { GamesComponent } from './pages/games/games.component';
import { GameComponent } from './content/game/game.component';


@NgModule({
    declarations: [
        GamesComponent,
        GameComponent
    ],
    exports: [
        GamesComponent
    ],
  imports: [
    CommonModule,
    RouterOutlet,
    EditorRoutingModule
  ]
})
export class EditorModule { }
