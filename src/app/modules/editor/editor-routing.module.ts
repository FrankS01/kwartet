import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent} from "./pages/games/games.component";

export const routes: Routes = [
  {
    path: 'editor',
    redirectTo: 'editor/games',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'editor/games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
