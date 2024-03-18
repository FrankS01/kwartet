import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
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
import { ConfirmationService, MessageService, PrimeNGConfig } from "primeng/api";
import { EditGameComponent } from "./components/pages/edit-game/edit-game.component";
import { EditSetComponent } from "./components/pages/edit-set/edit-set.component";
import { GameSettingsComponent } from "./components/pages/game-settings/game-settings.component";
import { PrintComponent } from "./components/pages/print/print.component";
import { SidebarComponent } from "./components/organisms/sidebar/sidebar.component";
import { SidebarItemComponent } from "./components/molecules/sidebar-item/sidebar-item.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import {
  EditKwartetCardComponent
} from "./components/molecules/edit-kwartet-card/edit-kwartet-card.component";
import { ServiceWorkerModule } from '@angular/service-worker';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  primeConfig.ripple = true;
};

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    GamesComponent,
    EditGameComponent,
    EditSetComponent,
    GameSettingsComponent,
    PrintComponent,
    SidebarComponent,
    SidebarItemComponent,
    EditKwartetCardComponent
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
    ReactiveFormsModule,
    ConfirmDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true,
    }
  ],
  bootstrap: [ShellComponent]
})
export class AppModule { }
