import {Component} from '@angular/core';
import {ClassNode} from "../../model/node/class-node";
import {Position} from "../../model/position";
import {Edge, EndStyle, LineType} from "../../model/edge";
import {Node} from "../../model/node/node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {EllipseNode} from "../../model/node/ellipse-node";

@Component({
  selector: 'creation-sidebar',
  templateUrl: './creation-sidebar.component.html',
  styleUrls: ['./creation-sidebar.component.scss']
})
export class CreationSidebarComponent {
  public static readonly WIDTH: number = 200;

  constructor(private dragDropCreationService: DragDropCreationService, private sanitizer: DomSanitizer) {

  }

  get styleObject() {
    return {
      width: CreationSidebarComponent.WIDTH
    }
  }

  get groups(): {[key: string]: DiagramTypeTemplate} {
    let cd: DiagramTypeTemplate = {nodes: {}, edges: {}};
    let classNode = new ClassNode(200, 100, new Position(0, 0));
    let association = new Edge(new Position(10, 20), new Position(196, 20));
    let generalisation = new Edge(new Position(10, 20), new Position(196, 20));
    generalisation.endStyle = EndStyle.LargeUnfilledArrow;

    classNode.text = 'ClassName  \\n fieldName: type';

    cd.nodes['Class'] = classNode;
    cd.edges['Association'] = association;
    cd.edges['Generalisation'] = generalisation;

    let ad: DiagramTypeTemplate = {nodes: {}, edges: {}};
    let activityNode = new RectangleNode(200, 100, new Position(0, 0));
    activityNode.text = "Activity"
    let arrow = new Edge(new Position(10, 20), new Position(196, 20));
    arrow.endStyle = EndStyle.SmallFilledArrow;

    classNode.text = 'ClassName  \\n fieldName: type';

    ad.nodes['Activity'] = activityNode;
    cd.edges['Arrow'] = arrow;

    let state = new EllipseNode(60, 60, new Position(0, 0));
    let endState = new EllipseNode(60, 60, new Position(0, 0))
    endState.hasDoubleBorder = true;
    let arc = new Edge( new Position(10, 5), new Position( 196, 5));
    arc.lineType = LineType.Arc;
    arc.endStyle = EndStyle.SmallFilledArrow;
    arc.middlePositions.push(new Position(103, 35));
    let fsm: DiagramTypeTemplate = {nodes: {}, edges: {}};
    fsm.nodes['State'] = state;
    fsm.nodes['End State'] = endState;
    fsm.edges['Arrow'] = arrow;
    fsm.edges['Arc'] = arc;

    return {
      'Class Diagram': cd,
      'Activity Diagram': ad,
      'Finite State Machine': fsm,
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

  getSafePreview(groupKey: string, nodeKey: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.groups[groupKey].nodes[nodeKey].preview);
  }
}

type DiagramTypeTemplate = {
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge }
}
