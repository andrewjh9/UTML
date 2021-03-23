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
import {SelectionService} from "../services/selection.service";
import {Label} from "../../model/label";
import {DiagramContainerService} from "../services/diagram-container.service";
import {DeletionService} from "../services/deletion.service";

@Component({
  selector: 'creation-sidebar',
  templateUrl: './creation-sidebar.component.html',
  styleUrls: ['./creation-sidebar.component.scss']
})
export class CreationSidebarComponent {
  public static readonly WIDTH: number = 200;
  private selectedKeys: [string, string] | undefined;
  edgeCreationIsActive: boolean = false;
  private selectedElement: Edge | Node | undefined = undefined;

  constructor(private dragDropCreationService: DragDropCreationService,
              private diagramContainerService: DiagramContainerService,
              private edgeCreationService: EdgeCreationService,
              private selectionService: SelectionService,
              private deletionService: DeletionService) {
    edgeCreationService.activityObservable.subscribe(active => {
      this.edgeCreationIsActive = active;
      if (!active) {
        this.selectedKeys = undefined;
      }
    });

    selectionService.selectedObservable.subscribe(selectedList => {
      if (selectedList.length === 1 && !(selectedList[0] instanceof Label)) {
        this.selectedElement = selectedList[0];
      } else {
        this.selectedElement = undefined;
      }
    });

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
    if (this.selectedElement === undefined) {
      if (type === 'node') {
        this.dragDropCreationService.activate(this.groups[groupKey].nodes[elementKey]);
      } else {
        this.dragDropCreationService.activate(this.groups[groupKey].edges[elementKey]);
        this.selectedKeys = [groupKey, elementKey];
      }
    } else if (type === 'node' && this.selectedElement instanceof Node) {
      let old = <Node> this.selectedElement;
      let newN = this.groups[groupKey].nodes[elementKey].getDeepCopy();
      newN.position = old.position;
      newN.width = old.width;
      newN.height = old.height;
      newN.text = old.text;
      this.deletionService.deleteNode(old);
      this.diagramContainerService.get().nodes.push(newN)
      this.selectionService.setNode(newN);
    } else if (type === 'edge' && this.selectedElement instanceof Edge) {
      let edge = <Edge> this.selectedElement;
      let newEdge = this.groups[groupKey].edges[elementKey].getDeepCopy();
      newEdge.startPosition = edge.startPosition;
      newEdge.endPosition = edge.endPosition;
      newEdge.startNode = edge.startNode;
      newEdge.endNode = edge.endNode;
      newEdge.startLabel = edge.startLabel;
      newEdge.middleLabel = edge.middleLabel;
      newEdge.endLabel = edge.endLabel;
      newEdge.middlePositions = edge.middlePositions;
      if (newEdge.lineType === LineType.Arc && newEdge.middlePositions.length !== 1) {
        newEdge.setDefaultMiddlePointOnArc();
      }
      let edges = this.diagramContainerService.get().edges;
      edges[edges.indexOf(edge)] = newEdge;
      // The new node should be selected.
      // For some reason if we select it without delay,
      // it does not update the edge attribute of the component quick enough.
      setTimeout(() => this.selectionService.setEdge(newEdge), 50);
    }
  }

  isSelected(groupKey: string, edgeKey: string) {
    return this.selectedKeys !== undefined && this.selectedKeys[0] === groupKey && this.selectedKeys[1] === edgeKey;
  }
}

type DiagramTypeTemplate = {
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge }
}
