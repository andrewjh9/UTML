import {Position} from '../../assets/serialisation/position';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AttachmentDirection, Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Edge, EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
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
export class DiagramComponent {
  @Input() public mode?: boolean;
  @Output() public modeChange: EventEmitter<boolean> = new EventEmitter();

  public diagram: Diagram;
  constructor(private repositionService: RepositionService, private edgeRepositionService: EdgeRepositionService) {
    this.diagram = fsm;
    // this.diagram = ad;
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
    if (this.repositionService.isActive()) {
      this.repositionService.update(new Position(event.clientX, event.clientY))
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.update(new Position(event.clientX, event.clientY))
    }
  }
}

