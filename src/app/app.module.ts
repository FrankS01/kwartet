import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ShellComponent } from './components/pages/shell/shell.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { GamesComponent } from './components/pages/games/games.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from "primeng/inputtext";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [
    ShellComponent,
    HomeComponent,
    FooterComponent,
    GamesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule { }
