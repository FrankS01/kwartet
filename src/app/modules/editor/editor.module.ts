import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";
import { EditorRoutingModule } from './editor-routing.module';
import { GamesOverviewPageComponent } from './pages/games-overview-page/games-overview-page.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { GameDetailsPageComponent } from './pages/game-details-page/game-details-page.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { SetEditorComponent } from './content/set-editor/set-editor.component';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    declarations: [
        GamesOverviewPageComponent,
        GameDetailsPageComponent,
        SetEditorComponent,
    ],
    exports: [
        GamesOverviewPageComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        EditorRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class EditorModule { }
