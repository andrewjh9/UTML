import {Component, Input, OnInit} from '@angular/core';
import {AbstractNodeComponent} from "../abstract-node-component";
import {EllipseNode} from "../../../model/node/ellipse-node";
import {Node} from "../../../model/node/node";
import {RepositionService} from "../../services/reposition.service";
import {ModeService} from "../../services/mode.service";
import {SelectionService} from "../../services/selection.service";

@Component({
  selector: '[ellipse-node]',
  templateUrl: './ellipse-node.component.html',
  styleUrls: ['./ellipse-node.component.scss']
})
export class EllipseNodeComponent extends AbstractNodeComponent {
  @Input() node?: EllipseNode;

  constructor(repositionService: RepositionService,
              modeService: ModeService,
              selectionService: SelectionService) {
    super(repositionService, modeService, selectionService);
  }

  public getNode(): Node {
    return this.node as Node;
  }
}
