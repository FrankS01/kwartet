import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/pages/home/home.component";
import { GamesComponent } from "./components/pages/games/games.component";
import { EditGameComponent } from "./components/pages/edit-game/edit-game.component";
import { PrintLayoutComponent } from "./components/printables/print-layout/print-layout.component";

const titlePrefix = "Kwartet - "

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: titlePrefix + "Create your own quartets games!"
  },
  {
    path: 'games',
    component: GamesComponent,
    title: titlePrefix + "Manage games"
  },
  {
    path: 'edit-game/:game-id',
    component: EditGameComponent,
    title: titlePrefix + "Editing game",
  },
  {
    path: 'print/:game-id',
    component: PrintLayoutComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
