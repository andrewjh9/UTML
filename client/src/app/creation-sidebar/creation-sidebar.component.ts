import { Component, OnInit } from '@angular/core';
import {ClassNode} from "../../model/node/class-node";
import {Position} from "../../model/position";
import {Edge, EndStyle} from "../../model/edge";
import {Diagram} from "../../model/diagram";
import {Node} from "../../model/node/node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {DragDropCreationService} from "../services/drag-drop-creation.service";

@Component({
  selector: 'creation-sidebar',
  templateUrl: './creation-sidebar.component.html',
  styleUrls: ['./creation-sidebar.component.scss']
})
export class CreationSidebarComponent {
  public static readonly WIDTH: number = 200;

  constructor(private dragDropCreationService: DragDropCreationService) {

  }

  get styleObject() {
    return {
      width: CreationSidebarComponent.WIDTH
    }
  }

  get groups(): {[key: string]: DiagramTypeTemplate} {
    let cd: DiagramTypeTemplate = {nodes: {}, edges: {}};
    let classNode = new ClassNode(250, 200, new Position(0, 0));
    let association = new Edge(new Position(0, 0), new Position(50, 50));
    let generalisation = new Edge(new Position(0, 0), new Position(50, 50));
    generalisation.endStyle = EndStyle.LargeUnfilledArrow;

    classNode.text = 'ClassName  \\n fieldName: type';

    cd.nodes['Class'] = classNode;
    cd.edges['Association'] = association;
    cd.edges['Generalisation'] = generalisation;

    let ad: DiagramTypeTemplate = {nodes: {}, edges: {}};
    let activityNode = new RectangleNode(250, 200, new Position(0, 0));
    activityNode.text = "Activity"
    let arrow = new Edge(new Position(0, 0), new Position(50, 50));
    arrow.endStyle = EndStyle.SmallFilledArrow;

    classNode.text = 'ClassName  \\n fieldName: type';

    ad.nodes['Activity'] = activityNode;
    cd.edges['Arrow'] = arrow;


    return {
      'Class Diagram': cd,
      'Activity Diagram': ad
    }
  }

  get groupKeys() {
    return Object.keys(this.groups);
  }

  Object = Object;

  handleMouseDown(event: MouseEvent, edgeOrNode: Edge | Node) {
    if (!this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.activate(edgeOrNode);
    } else {
      console.log('Drag and drop service is already active.');
    }
  }

  handleMouseUp($event: MouseEvent) {
    if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.cancel();
    }
  }
}

type DiagramTypeTemplate = {
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge }
}
