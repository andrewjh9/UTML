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
import { NodeEditorComponent } from './node-compontents/node-editor/node-editor.component';
import { MoveMenuComponent } from './move-menu/move-menu.component';
import { ClickableAttachmentPointsComponent } from './node-compontents/clickable-attachment-points/clickable-attachment-points.component';
import {ClickableResizePointsComponent} from "./node-compontents/clickable-resize-points/clickable-resize-points.component";
import { ExportDiagramComponent } from './export-diagram/export-diagram.component';
import { BasicNodeTextComponent } from './node-compontents/basic-node-text/basic-node-text.component';
import { DiagramImportComponent } from './diagram-import/diagram-import.component';
import { LifelineComponent } from './lifeline/lifeline.component';
import { SequenceDiagramComponent } from './sequence-diagram/sequence-diagram.component';
import { SequenceEdgeComponent } from './sequence-edge/sequence-edge.component';
import { SelectedNodeHighlightComponent } from './node-compontents/selected-node-highlight/selected-node-highlight.component';
import { CreationSidebarComponent } from './creation-sidebar/creation-sidebar.component';
import { DragDropPreviewComponent } from './drag-drop-preview/drag-drop-preview.component';
import {LineRenderComponent} from "./edge/line-render/line-render.component";
import { ArcRenderComponent } from './edge/edge-render/arc-render.component';
import { ClassNodeRenderComponent } from './node-compontents/class-node/class-node-render.component';
import { RectangleNodeRenderComponent } from './node-compontents/rectangle-node/rectangle-node-render.component';
import { EllipseNodeRenderComponent } from './node-compontents/ellipse-node/ellipse-node-render.component';
import { DiamondNodeRenderComponent } from './node-compontents/diamond-node/diamond-node-render.component';
import { EdgeRenderDispatchComponent } from './edge/edge-render-dispatch/edge-render-dispatch.component';
import { NodeRenderDispatchComponent } from './node-compontents/node-render-dispatch/node-render-dispatch.component';
import {NodeComponent} from "./node-compontents/node-component";
import { FormattingModalComponent } from './formatting-modal/formatting-modal.component';
import { EdgeFormattingModalComponent } from './edge-formatting-modal/edge-formatting-modal.component';
import { UploadModalComponent } from './upload-modal/upload-modal.component';
import { SaveModalComponent } from './save-modal/save-modal.component';
import { DragSelectPreviewComponent } from './drag-select-preview/drag-select-preview.component';
import { HourglassNodeRenderComponent } from './node-compontents/hourglass-node/hourglass-node-render.component';
import { ActorNodeRenderComponent } from './node-compontents/actor-node/actor-node-render.component';
import { DiagramManagementModalComponent } from './diagram-management-modal/diagram-management-modal.component';
import { DiagramPreviewComponent } from './diagram-preview/diagram-preview.component';
import { BelowTextNodeComponent } from './node-compontents/below-text-node/below-text-node.component';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faEdit, faEye, faEyeSlash, faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import {
  faCog,
  faCopy, faFile,
  faFolderOpen, faList,
  faPaste, faQuestion,
  faRedo,
  faSave,
  faSearchMinus,
  faSearchPlus, faTasks,
  faUndo, faUser, faUserSlash
} from "@fortawesome/free-solid-svg-icons";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpecialCharacterSelectorComponent } from './special-character-selector/special-character-selector.component';
import { SpecialCharacterRowComponent } from './special-character-row/special-character-row.component';
import { GridOverlayComponent } from './grid-overlay/grid-overlay.component';
import { ClickableMiddlePointsComponent } from './edge/clickable-middle-points/clickable-middle-points.component';
import { ClickableNewPointsComponent } from './edge/clickable-new-points/clickable-new-points.component';
import { ClickableStartEndPointsComponent } from './edge/clickable-start-end-points/clickable-start-end-points.component';
import { ClearDiagramModalComponent } from './clear-diagram-modal/clear-diagram-modal.component';
import { ShapesetManagementModalComponent } from './shapeset-management-modal/shapeset-management-modal.component';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { HintOverlayComponent } from './hint-overlay/hint-overlay.component';

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
    ClickableAttachmentPointsComponent,
    ClickableResizePointsComponent,
    ExportDiagramComponent,
    BasicNodeTextComponent,
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
    NodeComponent,
    NodeComponent,
    FormattingModalComponent,
    EdgeFormattingModalComponent,
    UploadModalComponent,
    SaveModalComponent,
    DragSelectPreviewComponent,
    HourglassNodeRenderComponent,
    ActorNodeRenderComponent,
    DiagramManagementModalComponent,
    DiagramPreviewComponent,
    BelowTextNodeComponent,
    NavBarComponent,
    SpecialCharacterSelectorComponent,
    SpecialCharacterRowComponent,
    GridOverlayComponent,
    ClickableMiddlePointsComponent,
    ClickableNewPointsComponent,
    ClickableStartEndPointsComponent,
    ClearDiagramModalComponent,
    ShapesetManagementModalComponent,
    HelpModalComponent,
    HintOverlayComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        FontAwesomeModule
    ],
  providers: [RepositionService, ModeService, DeletionService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashAlt, faEdit, faEye, faEyeSlash, faSave, faUndo, faRedo, faCopy, faPaste, faFolderOpen,
      faSearchMinus, faSearchPlus, faQuestion, faCog, faUser, faTasks, faUserSlash, faList, faFile);
  }
}
