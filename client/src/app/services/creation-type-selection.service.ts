import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Position} from "../../model/position";
import { EndStyle, LineType} from "../../model/edge";
import {Node} from "../../model/node/node";
import {DiamondNode} from "../../model/node/diamond-node";
import {EllipseNode} from "../../model/node/ellipse-node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {ClassNode} from "../../model/node/class-node";

@Injectable({
  providedIn: 'root'
})
export class CreationTypeSelectionService {
  private readonly nodeTypes: Node[];
  private currentNodeIndex: number;

  private readonly edgeFormatterProperties: Object[];
  private currentEdgeFormatterIndex: number;

  constructor() {
    this.nodeTypes = [
      new RectangleNode(100, 100, new Position(0, 0)),
      new EllipseNode(100, 100, new Position(0, 0)),
      new DiamondNode(100, 100, new Position(0, 0)),
      new ForkRejoinNode(20, 300, new Position(0, 0)),
      new ClassNode(250, 100, new Position(0, 0))
    ];
    this.currentNodeIndex = 0;

    this.edgeFormatterProperties = [
      {},
      {"endStyle": EndStyle.SmallFilledArrow},
      {"lineType": LineType.Arc}
    ];
    this.currentEdgeFormatterIndex = 1;
  }

  public getAllEdgeFormatterProperties(): Object[] {
    return this.edgeFormatterProperties;
  }

  public getCurrentEdgeIndex(): number {
    return this.currentEdgeFormatterIndex;
  }

  public getSelectedProperty(): Object {
    return this.edgeFormatterProperties[this.currentEdgeFormatterIndex];
  }

  public setEdgeFormatterProperty(index: number): void {
    if (index < 0 || index >= this.edgeFormatterProperties.length) {
      throw new Error("The provided index is not validf");
    }

    this.currentEdgeFormatterIndex = index;
  }

  public getAllNodeTypes(): Node[] {
    return this.nodeTypes;
  }

  public getSelectedNodeType(): Node {
    return this.nodeTypes[this.currentNodeIndex].getDeepCopy();
  }

  public getCurrentNodeIndex(): number {
    return this.currentNodeIndex;
  }

  public setNodeType(index: number): void {
    if (index < 0 || index >= this.nodeTypes.length) {
      throw new Error("The provided index is not validf");
    }
    this.currentNodeIndex = index;
  }

  getNodeTypeName(index: number) {
    return this.nodeTypes[index].getNodeTypeName();
  }
}
