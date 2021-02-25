import {Position} from '../../assets/serialisation/position';
import {AfterViewInit, Component} from '@angular/core';
import {Edge, LineType} from "../../assets/serialisation/edge";
import {Diagram} from "../../assets/serialisation/diagram";
import {RepositionService} from "../services/reposition.service";
import {fsm} from "../../assets/serialisation/examples/fsm";
import {cd} from "../../assets/serialisation/examples/cd";

import {EdgeRepositionService} from "../services/edge-reposition/edge-reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {DeletionService} from "../services/deletion.service";
import {CreationTypeSelectionService} from "../services/creation-type-selection.service";
import {ad} from "../../assets/serialisation/examples/ad";
import {Node} from "../../assets/serialisation/node/node";
import {ResizeService} from "../services/resize.service";
import {ForkRejoinNode} from "../../assets/serialisation/node/fork-rejoin-node";
import {ClassNode} from "../../assets/serialisation/node/class-node";


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  public diagram: Diagram;
  mode: Mode;
  Mode = Mode;

  constructor(private repositionService: RepositionService, private edgeRepositionService: EdgeRepositionService,
              private modeService: ModeService, private edgeCreationService: EdgeCreationService,
              private deletionService: DeletionService,
              private creationTypeSelectionService: CreationTypeSelectionService,
              private resizeService: ResizeService) {
    this.modeService.modeObservable.subscribe((mode: Mode) => this.mode = mode);
    this.mode = modeService.getLatestMode();
    // this.diagram = fsm;
    // this.diagram = ad;
    this.diagram = cd;
    edgeCreationService.newEdgeEmitter.subscribe((newEdge: Edge) => this.diagram.edges.push(newEdge));

    deletionService.setDiagram(this.diagram);
  }

  ngAfterViewInit() {
    if (this.diagram) {
      // @ts-ignore
      this.edgeRepositionService.setNodes(this.diagram.nodes);
    }
  }

  handleMouseUp(event: MouseEvent): void {
    if (this.repositionService.isActive()) {
      this.repositionService.deactivate();
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.deactivate()
    } else if (this.resizeService.isActive()) {
      this.resizeService.deactivate()
    }
  }

  handleMouseMove(event: MouseEvent) {
    // let position = new Position(event.clientX, event.clientY);
    let position = new Position(event.pageX, event.pageY);

    if (this.repositionService.isActive()) {
      this.repositionService.update(position);
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.update(position);
    } else if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.endPreview = position;
    } else if (this.resizeService.isActive()) {
      this.resizeService.update(position);
    }
  }

  handleDoubleClick(event: MouseEvent){
    if (this.mode === Mode.Create) {
      if (event.ctrlKey) {
        // let formatter = new EdgeFormatter(new Position(event.clientX, event.clientY),
        //   new Position(event.clientX + 100, event.clientY + 100), undefined, undefined);
        // // for (let [key, value] of Object.entries(this.creationFormatterSelectionService.getSelectedProperty())) {
        // //   // @ts-ignore
        // //   formatter[key] = value;
        // // }
        // if (formatter.lineType === LineType.Arc) {
        //   formatter.setDefaultMiddlePointOnArc();
        // }
        //
        // this.diagram.unstructuredEdges.push(formatter);
      } else {
        let newNode : Node= this.creationTypeSelectionService.getSelectedNodeType();
        newNode.position = new Position(event.clientX - newNode.width / 2, event.clientY - newNode.height / 2);;
        this.diagram.nodes.push(newNode);
      }
    }
  }

  handleKeyPressed(event: KeyboardEvent): void {
    const SELECT_KEY = "1";
    const CREATE_KEY = "2";
    const MOVE_KEY = "3";
    console.log(event.ctrlKey);
    console.log(event.key);

    if (event.ctrlKey) {
      switch (event.key) {
        case SELECT_KEY :
          this.modeService.setMode(Mode.Select);
          break;
        case CREATE_KEY:
          this.modeService.setMode(Mode.Create);
          break;
        case MOVE_KEY:
          this.modeService.setMode(Mode.Move);
          break;
      }
    }
  }
}
