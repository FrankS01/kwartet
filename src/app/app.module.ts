import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ShellComponent } from './components/pages/shell/shell.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { GamesComponent } from './components/pages/games/games.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { HeaderComponent } from './components/organisms/header/header.component';

@NgModule({
  declarations: [
    ShellComponent,
    HomeComponent,
    FooterComponent,
    GamesComponent,
    ButtonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule { }
