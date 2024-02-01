import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/pages/home/home.component";
import { GamesComponent } from "./components/pages/games/games.component";
import { EditGameComponent } from "./components/pages/edit-game/edit-game.component";

const titlePrefix = "Kwartet - "

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: titlePrefix + "create your own quartets games!"
  },
  {
    path: 'games',
    component: GamesComponent,
    title: titlePrefix + "Manage games"
  },
  {
    path: 'edit-game/:uuid',
    component: EditGameComponent,
    title: titlePrefix + "Editing game"
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
