import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesOverviewPageComponent} from "./pages/games-overview-page/games-overview-page.component";
import { GameDetailsPageComponent } from "./pages/game-details-page/game-details-page.component";

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
    component: GamesOverviewPageComponent
  },
  {
    path: 'game/:id',
    component: GameDetailsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
