import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DiagramComponent } from './diagram/diagram.component';
import { EdgeComponent } from './edge/edge.component';
import { ArrowMarkerComponent } from './arrow-marker/arrow-marker.component';
import {FormsModule} from "@angular/forms";
import { LabelComponent } from './label/label.component';
import {RepositionService} from "./services/reposition.service";
import {ModeSelectorComponent} from "./mode-selector/mode-selector.component";
import {ModeService} from "./services/mode.service";
import { NewEdgePreviewComponent } from './new-edge-preview/new-edge-preview.component';
import { SelectedEditorComponent } from './selected-editor/selected-editor.component';
import {DeletionService} from "./services/deletion.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EdgeEditorComponent } from './edge-editor/edge-editor.component';
import { NodeEditorComponent } from './node-editor/node-editor.component';
import { MoveMenuComponent } from './move-menu/move-menu.component';
import { NodeDispatcherComponent } from './node-compontents/node-dispatcher/node-dispatcher.component';
import { RectangleNodeComponent } from './node-compontents/rectangle-node/rectangle-node.component';
import { EllipseNodeComponent } from './node-compontents/ellipse-node/ellipse-node.component';
import { DiamondNodeComponent } from './node-compontents/diamond-node/diamond-node.component';
import { ClickableAttachmentPointsComponent } from './node-compontents/clickable-attachment-points/clickable-attachment-points.component';
import {ClickableResizePointsComponent} from "./node-compontents/clickable-resize-points/clickable-resize-points.component";
import { ExportDiagramComponent } from './export-diagram/export-diagram.component';
import { ClassNodeComponent } from './node-compontents/class-node/class-node.component';
import { BasicNodeTextComponent } from './node-compontents/basic-node-text/basic-node-text.component';
import { DiagramDownloadComponent } from './diagram-download/diagram-download.component';
import { JsonUriPipe } from './json-uri.pipe';
import { DiagramImportComponent } from './diagram-import/diagram-import.component';
import { LifelineComponent } from './lifeline/lifeline.component';
import { SequenceDiagramComponent } from './sequence-diagram/sequence-diagram.component';
import { SequenceEdgeComponent } from './sequence-edge/sequence-edge.component';
import { SelectedNodeHighlightComponent } from './node-compontents/selected-node-highlight/selected-node-highlight.component';
import { CreationSidebarComponent } from './creation-sidebar/creation-sidebar.component';
import { DragDropPreviewComponent } from './drag-drop-preview/drag-drop-preview.component';
import {LineRenderComponent} from "./edge/line-render/line-render.component";
import { ArcRenderComponent } from './edge/edge-render/arc-render.component';
import { ClassNodeRenderComponent } from './node-compontents/class-node/class-node-render/class-node-render.component';
import { RectangleNodeRenderComponent } from './node-compontents/rectangle-node/rectangle-node-render/rectangle-node-render.component';
import { EllipseNodeRenderComponent } from './node-compontents/ellipse-node/ellipse-node-render/ellipse-node-render.component';
import { DiamondNodeRenderComponent } from './node-compontents/diamond-node/diamond-node-render/diamond-node-render.component';
import { EdgeRenderDispatchComponent } from './edge/edge-render-dispatch/edge-render-dispatch.component';
import { NodeRenderDispatchComponent } from './node-compontents/node-render-dispatch/node-render-dispatch.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagramComponent,
    LineRenderComponent,
    EdgeComponent,
    ArrowMarkerComponent,
    LabelComponent,
    ModeSelectorComponent,
    NewEdgePreviewComponent,
    SelectedEditorComponent,
    EdgeEditorComponent,
    NodeEditorComponent,
    MoveMenuComponent,
    NodeDispatcherComponent,
    RectangleNodeComponent,
    EllipseNodeComponent,
    DiamondNodeComponent,
    ClickableAttachmentPointsComponent,
    ClickableResizePointsComponent,
    ExportDiagramComponent,
    ClassNodeComponent,
    BasicNodeTextComponent,
    DiagramDownloadComponent,
    JsonUriPipe,
    DiagramImportComponent,
    LifelineComponent,
    SequenceDiagramComponent,
    SequenceEdgeComponent,
    SelectedNodeHighlightComponent,
    CreationSidebarComponent,
    DragDropPreviewComponent,
    ArcRenderComponent,
    ClassNodeRenderComponent,
    RectangleNodeRenderComponent,
    EllipseNodeRenderComponent,
    DiamondNodeRenderComponent,
    EdgeRenderDispatchComponent,
    NodeRenderDispatchComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule,

    ],
  providers: [RepositionService, ModeService, DeletionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
