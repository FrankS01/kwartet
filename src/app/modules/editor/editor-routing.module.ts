import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent} from "./pages/games/games.component";
import { GameComponent } from "./pages/game/game.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor/games',
    pathMatch: 'full'
  },
  {
    path: 'editor',
    redirectTo: 'editor/games',
    pathMatch: 'full'
  },

  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'game/:id',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
