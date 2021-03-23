import {Component, OnInit} from '@angular/core';
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
import {DiagramComponent} from "../diagram/diagram.component";

@Component({
  selector: 'creation-sidebar',
  templateUrl: './creation-sidebar.component.html',
  styleUrls: ['./creation-sidebar.component.scss']
})
export class CreationSidebarComponent implements OnInit{
  public static readonly WIDTH: number = 300;

  constructor(private dragDropCreationService: DragDropCreationService,
              private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    let height: number = window.innerHeight - DiagramComponent.NAV_HEIGHT;
    let left: number = window.innerWidth - CreationSidebarComponent.WIDTH;
    document.getElementById("creation-side-bar")!.style.overflow = "auto";
    document.getElementById("creation-side-bar")!.style.height = height + "px";
    document.getElementById("creation-side-bar")!.style.width = CreationSidebarComponent.WIDTH + "px";
    document.getElementById("creation-side-bar")!.style.position = "absolute";
    document.getElementById("creation-side-bar")!.style.left = left + "px";
    document.getElementById("creation-side-bar")!.style.top = 50 + "px";

  }

  get styleObject() {
    return {
      width: CreationSidebarComponent.WIDTH,
      height: window.innerHeight - DiagramComponent.NAV_HEIGHT,
      left: window.innerWidth - CreationSidebarComponent.WIDTH
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

  isLine(edge: Edge): boolean {
    return edge.lineType === LineType.Line;
  }

  isArc(edge: Edge): boolean {
    return edge.lineType === LineType.Arc;
  }

  toClassNode(node: Node): ClassNode | undefined {
    return node instanceof ClassNode ? node as ClassNode : undefined;
  }

  toEllipseNode(node: Node): EllipseNode | undefined {
    return node instanceof EllipseNode ? node as EllipseNode : undefined;
  }

  toRectangleNode(node: Node): RectangleNode | undefined {
    return (node instanceof RectangleNode && !(node instanceof ClassNode)) ? node as RectangleNode : undefined;
  }

  toDiamondNode(node: Node): DiamondNode | undefined {
    return node instanceof DiamondNode ? node as DiamondNode : undefined;
  }

  getStyles() {
    return {


      left: window.innerWidth - CreationSidebarComponent.WIDTH,
      position: "absolute",
      top: 50
    }
  }
}

type DiagramTypeTemplate = {
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge }
}
