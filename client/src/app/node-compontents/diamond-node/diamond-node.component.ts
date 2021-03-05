import {Component, Input, OnInit} from '@angular/core';
import {AbstractNodeComponent} from "../abstract-node-component";
import {DiamondNode} from "../../../model/node/diamond-node";
import {Node} from "../../../model/node/node";
import {RepositionService} from "../../services/reposition.service";
import {ModeService} from "../../services/mode.service";
import {SelectionService} from "../../services/selection.service";

@Component({
  selector: '[diamond-node]',
  templateUrl: './diamond-node.component.html',
  styleUrls: ['./diamond-node.component.scss']
})
export class DiamondNodeComponent extends AbstractNodeComponent {
  @Input() node?: DiamondNode;

  constructor(repositionService: RepositionService,
              modeService: ModeService,
              selectionService: SelectionService) {
    super(repositionService, modeService, selectionService);
  }

  public getNode(): Node {
    return this.node as Node;
  }
}
