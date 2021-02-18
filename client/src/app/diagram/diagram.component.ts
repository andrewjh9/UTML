import {Position} from '../../assets/serialisation/position';
import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Edge, EdgeFormatter, EndStyle, LineStyle} from "../../assets/serialisation/edge";
import {Diagram} from "../../assets/serialisation/diagram";
import {RepositionService} from "../services/reposition.service";
import {fsm} from "../../assets/serialisation/examples/fsm";
import {ad} from "../../assets/serialisation/examples/ad";
import {Node, NodeFormatter, Shape} from "../../assets/serialisation/node";
import {EdgeRepositionService} from "../services/edge-reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {EdgeCreationService} from "../services/edge-creation-service.service";
import {DeletionService} from "../services/deletion.service";


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  public diagram: Diagram;
  public edgeFormatter: EdgeFormatter;
  private mode: Mode;

  constructor(private repositionService: RepositionService, private edgeRepositionService: EdgeRepositionService,
              private modeService: ModeService, private edgeCreationService: EdgeCreationService,
              deletionService: DeletionService) {
    this.modeService.modeObservable.subscribe((mode: Mode) => this.mode = mode);
    this.mode = modeService.getLatestMode();
    // this.diagram = fsm;
    this.diagram = ad;
    this.edgeFormatter = new EdgeFormatter(new Position(10, 150), new Position(100, 150));
    this.edgeFormatter.endStyle = EndStyle.SmallFilledArrow;
    this.edgeFormatter.lineStyle = LineStyle.Dashed;

    edgeCreationService.newEdgeEmitter.subscribe((newEdge: Edge) => this.diagram.edges.push(newEdge));

    deletionService.setDiagram(this.diagram);
  }

  ngAfterViewInit() {
    if (this.diagram) {
      this.edgeRepositionService.setNodes(this.diagram.nodes);
    }
  }

  handleMouseUp(event: MouseEvent): void {
    if (this.repositionService.isActive()) {
      this.repositionService.deactivate();
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.deactivate()
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
    }
  }

  handleDoubleClick(event: MouseEvent){
    if (this.mode === Mode.Create) {
      let nodeWidth: number = 100;
      let nodeHeight: number = 100;
      let nf: NodeFormatter = new NodeFormatter(100, 100, new Position(event.clientX - nodeWidth / 2, event.clientY - nodeHeight / 2), Shape.Rectangle);
      this.diagram.nodes.push({texts: [], formatter: nf});
    }
  }

  handleKeyPressed(event: KeyboardEvent): void{
    const SELECT_KEY = "1";
    const CREATE_KEY = "2";
    const MOVE_KEY = "3";

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
