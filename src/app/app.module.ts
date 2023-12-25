import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ShellComponent } from './components/pages/shell/shell.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/organisms/footer/footer.component';

@NgModule({
  declarations: [
    ShellComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule { }
