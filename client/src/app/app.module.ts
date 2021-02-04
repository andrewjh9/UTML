import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DiagramComponent } from './diagram/diagram.component';
import { NodeComponent } from './node/node.component';
import { EdgeComponent } from './edge/edge.component';
import { ArrowMarkerComponent } from './arrow-marker/arrow-marker.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    NodeComponent,
    EdgeComponent,
    ArrowMarkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
