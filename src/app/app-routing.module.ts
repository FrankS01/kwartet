import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from "./shared/navigation/navigation.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/editor/games',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'editor',
        loadChildren: () =>
          import('./modules/editor/editor.module').then(m => m.EditorModule)
      }
    ]
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/editor/games', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
