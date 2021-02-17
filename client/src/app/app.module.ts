import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DiagramComponent } from './diagram/diagram.component';
import { NodeComponent } from './node/node.component';
import { EdgeComponent } from './edge/edge.component';
import { ArrowMarkerComponent } from './arrow-marker/arrow-marker.component';
import {FormsModule} from "@angular/forms";
import { LabelComponent } from './label/label.component';
import {RepositionService} from "./services/reposition.service";
import { NonStructuralEdgeComponent } from './non-structural-edge/non-structural-edge.component';
import {ModeSelectorComponent} from "./mode-selector/mode-selector.component";
import {ModeService} from "./services/mode.service";
import { NewEdgePreviewComponent } from './new-edge-preview/new-edge-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    NodeComponent,
    EdgeComponent,
    ArrowMarkerComponent,
    LabelComponent,
    NonStructuralEdgeComponent,
    ModeSelectorComponent,
    NewEdgePreviewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [RepositionService, ModeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
