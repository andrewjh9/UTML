import {Component} from '@angular/core';
import {ClassNode} from "../../model/node/class-node";
import {Position} from "../../model/position";
import {Edge, EndStyle, LineType} from "../../model/edge";
import {Node} from "../../model/node/node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {EllipseNode} from "../../model/node/ellipse-node";
import {DiamondNode} from "../../model/node/diamond-node";
import {HourglassNode} from "../../model/node/hourglass-node";
import {ActorNode} from "../../model/node/actor-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {EdgeCreationService} from "../services/edge-creation.service";
import {group} from "@angular/animations";
import {element} from "protractor";

@Component({
  selector: 'creation-sidebar',
  templateUrl: './creation-sidebar.component.html',
  styleUrls: ['./creation-sidebar.component.scss']
})
export class CreationSidebarComponent {
  public static readonly WIDTH: number = 200;
  private selectedKeys: [string, string] | undefined;
  edgeCreationIsActive: boolean = false;

  constructor(private dragDropCreationService: DragDropCreationService,
              private edgeCreationService: EdgeCreationService) {
    edgeCreationService.activityObservable.subscribe(active => {
      this.edgeCreationIsActive = active;
      if (!active) {
        this.selectedKeys = undefined;
      }
    })

  }

  get styleObject() {
    return {
      width: CreationSidebarComponent.WIDTH
    }
  }

  get groups(): {[key: string]: DiagramTypeTemplate} {
    let cd: DiagramTypeTemplate = {nodes: {}, edges: {}};
    let classNode = new ClassNode(186, 75, new Position(10, 2));
    let association = new Edge(new Position(10, 20), new Position(196, 20));
    let generalisation = new Edge(new Position(10, 20), new Position(196, 20));
    generalisation.endStyle = EndStyle.LargeUnfilledArrow;

    classNode.text = 'ClassName  \\n fieldName: type';

    cd.nodes['Class'] = classNode;
    cd.edges['Association'] = association;
    cd.edges['Generalisation'] = generalisation;

    let ad: DiagramTypeTemplate = {nodes: {}, edges: {}};
    let activityNode = new RectangleNode(186, 50, new Position(10, 2));
    activityNode.text = "Do Something"
    let arrow = new Edge(new Position(10, 20), new Position(196, 20));
    arrow.endStyle = EndStyle.SmallFilledArrow;

    classNode.text = 'ClassName  \\n fieldName: type';

    ad.nodes['Activity'] = activityNode;
    ad.nodes['Hourglass'] = new HourglassNode(40, 80, new Position(84, 10));
    ad.nodes['Actor'] = new ActorNode(40, 80, new Position(84, 10));
    ad.nodes['Fork/Rejoin'] = new ForkRejoinNode(200, 20, new Position(8, 0));
    cd.edges['Arrow'] = arrow;

    let state = new EllipseNode(100, 100, new Position(58, 2));
    state.text = "s_0";
    let endState = new EllipseNode(100, 100, new Position(58, 2));
    endState.text = "s_end";

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

  handleGenericMouseUp(): void {
    if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.cancel();
    }
  }

  handleEdgeMouseUp(groupKey: string, elementKey: string) {
    if (this.selectedKeys !== undefined && this.selectedKeys[0] === groupKey &&
      this.selectedKeys[1] === elementKey) {
      this.edgeCreationService.activate(this.groups[groupKey].edges[elementKey])
    }
  }

  handleMouseDown(groupKey: string, elementKey: string, type: 'node' | 'edge'): void {
    if (type === 'node') {
      this.dragDropCreationService.activate(this.groups[groupKey].nodes[elementKey]);
    } else {
      this.dragDropCreationService.activate(this.groups[groupKey].edges[elementKey]);
      this.selectedKeys = [groupKey, elementKey];
    }
  }

  // handleMouseDown(event: MouseEvent, edgeOrNode: Edge | Node) {
  //   if (edgeOrNode instanceof Edge && <Edge> edgeOrNode !== this.edgeCreationService.factory) {
  //     console.log('wtf')
  //     this.edgeCreationService.deactivate();
  //   }
  //
  //   if (!this.dragDropCreationService.isActive()) {
  //     this.dragDropCreationService.activate(edgeOrNode);
  //   } else {
  //     console.log('Drag and drop service is already active.');
  //   }
  // }
  //
  // handleMouseUp(event: MouseEvent) {
  //   if (this.dragDropCreationService.isActive()) {
  //     this.dragDropCreationService.cancel();
  //   }
  // }
  //
  // handleEdgeClick(groupKey: string, edgeKey: string) {
  //   if (this.isSelected(groupKey, edgeKey)) {
  //     this.edgeCreationService.deactivate();
  //   } else {
  //     this.edgeCreationService.activate(this.groups[groupKey].edges[edgeKey]);
  //     this.selectedKeys = [groupKey, edgeKey];
  //   }
  // }

  isSelected(groupKey: string, edgeKey: string) {
    return this.selectedKeys !== undefined && this.selectedKeys[0] === groupKey && this.selectedKeys[1] === edgeKey;
  }
}

type DiagramTypeTemplate = {
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge }
}
