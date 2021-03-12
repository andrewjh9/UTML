import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";
import {RectangleNode} from "../../../model/node/rectangle-node";
import {ClassNode} from "../../../model/node/class-node";
import {EllipseNode} from "../../../model/node/ellipse-node";
import {DiamondNode} from "../../../model/node/diamond-node";

@Component({
  selector: '[node-render-dispatch]',
  templateUrl: './node-render-dispatch.component.html',
  styleUrls: ['./node-render-dispatch.component.scss']
})
export class NodeRenderDispatchComponent {
  @Input() node!: Node

  isRectangle(node: Node): boolean {
    return node instanceof RectangleNode && !(node instanceof ClassNode);
  }

  castToRectangle(node: Node): RectangleNode {
    return <RectangleNode> node;
  }

  castToEllipse(node: Node): EllipseNode {
    return <EllipseNode> node;
  }

  isEllipse(node: Node): boolean {
    return node instanceof EllipseNode;
  }

  castToDiamond(node: Node): DiamondNode {
    return <DiamondNode> node;
  }

  isDiamond(node: Node): boolean {
    return node instanceof DiamondNode;
  }

  isClass(node: Node): boolean {
    return node instanceof ClassNode;
  }

  castToClass(node: Node): ClassNode {
    return <ClassNode> node;
  }
}
