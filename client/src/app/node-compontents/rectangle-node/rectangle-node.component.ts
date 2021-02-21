import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../assets/serialisation/node/rectangle-node";
import {AbstractNodeComponent} from "../abstract-node-component";
import {Node} from "../../../assets/serialisation/node/node";
import {RepositionService} from "../../services/reposition.service";
import {ModeService} from "../../services/mode.service";
import {SelectionService} from "../../services/selection.service";

@Component({
  selector: '[rectangle-node]',
  templateUrl: './rectangle-node.component.html',
  styleUrls: ['./rectangle-node.component.scss']
})
export class RectangleNodeComponent extends AbstractNodeComponent {
  @Input() node?: RectangleNode;

  constructor(repositionService: RepositionService,
              modeService: ModeService,
              selectionService: SelectionService) {
    super(repositionService, modeService, selectionService);
  }

  protected getNode(): Node {
    return this.node as Node;
  }
}
