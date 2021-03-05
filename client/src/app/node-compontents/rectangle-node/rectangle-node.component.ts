import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../model/node/rectangle-node";
import {AbstractNodeComponent} from "../abstract-node-component";
import {Node} from "../../../model/node/node";
import {RepositionService} from "../../services/reposition.service";
import {ModeService} from "../../services/mode.service";
import {SelectionService} from "../../services/selection.service";

@Component({
  selector: '[rectangle-node]',
  templateUrl: './rectangle-node.component.html',
  styleUrls: ['./rectangle-node.component.scss']
})
export class RectangleNodeComponent extends AbstractNodeComponent {
  @Input() public node?: RectangleNode;

  constructor(repositionService: RepositionService,
              modeService: ModeService,
              selectionService: SelectionService) {
    super(repositionService, modeService, selectionService);
  }

  public getNode(): Node {
    return this.node as Node;
  }
}
