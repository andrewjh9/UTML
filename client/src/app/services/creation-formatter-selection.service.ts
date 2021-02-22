import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Position} from "../../assets/serialisation/position";
import { EndStyle, LineType} from "../../assets/serialisation/edge";
import {Node} from "../../assets/serialisation/node/node";
import {DiamondNode} from "../../assets/serialisation/node/diamond-node";
import {EllipseNode} from "../../assets/serialisation/node/ellipse-node";
import {RectangleNode} from "../../assets/serialisation/node/rectangle-node";

@Injectable({
  providedIn: 'root'
})
export class CreationFormatterSelectionService {
  private readonly nodeTypes: Node[];
  private currentNodeIndex: number;

  private readonly edgeFormatterProperties: Object[];
  private currentEdgeFormatterIndex: number;

  constructor() {
    this.nodeTypes = [
      new EllipseNode(100, 100, new Position(0, 0)),
      new DiamondNode(100, 100, new Position(0, 0)),
      new RectangleNode(100, 100, new Position(0, 0)),
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
}
