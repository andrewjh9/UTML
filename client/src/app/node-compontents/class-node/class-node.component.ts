import {Component, Input, OnInit} from '@angular/core';
import {AbstractNodeComponent} from "../abstract-node-component";
import {ClassNode} from "../../../assets/serialisation/node/class-node";
import {Node} from "../../../assets/serialisation/node/node";
import {RepositionService} from "../../services/reposition.service";
import {ModeService} from "../../services/mode.service";
import {SelectionService} from "../../services/selection.service";

@Component({
  selector: '[class-node]',
  templateUrl: './class-node.component.html',
  styleUrls: ['./class-node.component.scss']
})
export class ClassNodeComponent extends AbstractNodeComponent {
  @Input() node?: ClassNode;

  constructor(repositionService: RepositionService,
              modeService: ModeService,
              selectionService: SelectionService) {
    super(repositionService, modeService, selectionService);
  }

  public getNode(): Node {
    return <Node> this.node;
  }

}
