import {Position} from '../../assets/serialisation/position';
import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {EdgeFormatter, EndStyle, LineStyle} from "../../assets/serialisation/edge";
import {Diagram} from "../../assets/serialisation/diagram";
import {RepositionService} from "../reposition.service";
import {fsm} from "../../assets/serialisation/examples/fsm";
import {ad} from "../../assets/serialisation/examples/ad";

import {EdgeRepositionService} from "../edge-reposition.service";


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  @Input() public mode?: boolean;
  @Output() public modeChange: EventEmitter<boolean> = new EventEmitter();

  public diagram: Diagram;
  public edgeFormatter: EdgeFormatter;
  constructor(private repositionService: RepositionService, private edgeRepositionService: EdgeRepositionService) {
    // this.diagram = fsm;
    this.diagram = ad;
    this.edgeFormatter = new EdgeFormatter(new Position(10, 150), new Position(100, 150));
    this.edgeFormatter.endStyle = EndStyle.SmallFilledArrow;
    this.edgeFormatter.lineStyle = LineStyle.Dashed;
  }

  ngAfterViewInit() {
    if (this.diagram) {
      this.edgeRepositionService.setNodes(this.diagram.nodes);
    }
  }

  log(): void {
    console.log(this.diagram);
  }

  setMode(mode: boolean): void {
    this.mode = mode;
    this.modeChange.emit(this.mode);
  }

  handleMouseUp(event: MouseEvent): void {
    if (this.repositionService.isActive()) {
      this.repositionService.deactivate();
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.deactivate()
    }
  }

  handleMouseMove(event: MouseEvent) {
    let position = new Position(event.clientX, event.clientY);
    if (this.repositionService.isActive()) {
      this.repositionService.update(new Position(event.clientX, event.clientY));
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.update(new Position(event.clientX, event.clientY));
    }
  }
}

