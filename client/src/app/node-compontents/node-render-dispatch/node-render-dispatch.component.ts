import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";
import {RectangleNode} from "../../../model/node/rectangle-node";
import {ClassNode} from "../../../model/node/class-node";
import {EllipseNode} from "../../../model/node/ellipse-node";
import {DiamondNode} from "../../../model/node/diamond-node";
import {HourglassNode} from "../../../model/node/hourglass-node";
import {ActorNode} from "../../../model/node/actor-node";
import {SwimlaneNode} from "../../../model/node/swimlane-node";

@Component({
  selector: '[node-render-dispatch]',
  templateUrl: './node-render-dispatch.component.html',
  styleUrls: ['./node-render-dispatch.component.scss']
})
export class NodeRenderDispatchComponent {
  @Input() node!: Node

  isRectangle(node: Node): boolean {
    return node instanceof RectangleNode && !(node instanceof ClassNode) && !(node instanceof HourglassNode)
      && !(node instanceof ActorNode) && !(node instanceof SwimlaneNode);
  }

  castToRectangle(node: Node): RectangleNode {
    return <RectangleNode>node;
  }

  castToEllipse(node: Node): EllipseNode {
    return <EllipseNode>node;
  }

  isEllipse(node: Node): boolean {
    return node instanceof EllipseNode;
  }

  castToDiamond(node: Node): DiamondNode {
    return <DiamondNode>node;
  }

  isDiamond(node: Node): boolean {
    return node instanceof DiamondNode;
  }

  isClass(node: Node): boolean {
    return node instanceof ClassNode;
  }

  castToClass(node: Node): ClassNode {
    return <ClassNode>node;
  }

  isHourglass(node: Node): boolean {
    return node instanceof HourglassNode;
  }

  castToHourglass(node: Node): HourglassNode {
    return <HourglassNode>node;
  }

  isActor(node: Node): boolean {
    return node instanceof ActorNode;
  }


  castToActor(node: Node): ActorNode {
    return <ActorNode>node;
  }

  isSwimlane(node: Node) {
    return node instanceof SwimlaneNode;
  }

  castToSwimlane(node: Node) {
    return <SwimlaneNode>node;
  }
}
