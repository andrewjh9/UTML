import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../assets/serialisation/node/node";
import {RectangleNode} from "../../../assets/serialisation/node/rectangle-node";
import {EllipseNode} from "../../../assets/serialisation/node/ellipse-node";
import {DiamondNode} from "../../../assets/serialisation/node/diamond-node";
import {ClassNode} from "../../../assets/serialisation/node/class-node";
@Component({
  selector: '[node-dispatcher]',
  templateUrl: './node-dispatcher.component.html',
  styleUrls: ['./node-dispatcher.component.scss']
})
export class NodeDispatcherComponent {
  @Input() nodes?: Node[];

  constructor() { }

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
