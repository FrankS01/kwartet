import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/pages/home/home.component";
import { GamesComponent } from "./components/pages/games/games.component";
import { EditGameComponent } from "./components/pages/edit-game/edit-game.component";
import { GameSettingsComponent } from "./components/pages/game-settings/game-settings.component";
import { PrintComponent } from "./components/pages/print/print.component";
import { EditSetComponent } from "./components/pages/edit-set/edit-set.component";

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
    path: 'edit-game/:game-id',
    component: EditGameComponent,
    title: titlePrefix + "Editing game",
    children: [
      {
        path: 'settings',
        component: GameSettingsComponent
      },
      {
        path: 'print',
        component: PrintComponent
      },
      {
        path: 'edit-set/:set-id',
        component: EditSetComponent,
      },
      {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'settings',
      }
    ]
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
