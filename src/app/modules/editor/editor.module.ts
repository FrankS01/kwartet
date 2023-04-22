import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { EditorRoutingModule } from './editor-routing.module';
import { GamesComponent } from './pages/games/games.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { GameComponent } from './pages/game/game.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";

@NgModule({
    declarations: [
        GamesComponent,
        GameComponent,
    ],
    exports: [
        GamesComponent
    ],
  imports: [
    CommonModule,
    RouterOutlet,
    EditorRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class EditorModule { }
