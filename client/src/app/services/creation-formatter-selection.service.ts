import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Position} from "../../assets/serialisation/position";
import {EdgeFormatter, EndStyle, LineType} from "../../assets/serialisation/edge";

@Injectable({
  providedIn: 'root'
})
export class CreationFormatterSelectionService {
  // private readonly nodeFormatters: NodeFormatter[];
  // private currentNodeIndex: number;
  //
  // private readonly edgeFormatterProperties: Object[];
  // private currentEdgeFormatterIndex: number;
  //
  // constructor() {
  //   this.nodeFormatters = [
  //     new NodeFormatter(100, 100, new Position(0, 0), Shape.Rectangle),
  //     new NodeFormatter(100, 100, new Position(0, 0), Shape.Ellipse),
  //     new NodeFormatter(100, 100, new Position(0, 0), Shape.Diamond)
  //   ];
  //   this.currentNodeIndex = 0;
  //
  //   this.edgeFormatterProperties = [
  //     {},
  //     {"endStyle": EndStyle.SmallFilledArrow},
  //     {"lineType": LineType.Arc}
  //   ];
  //   this.currentEdgeFormatterIndex = 1;
  // }
  //
  // public getAllEdgeFormatterProperties(): Object[] {
  //   return this.edgeFormatterProperties;
  // }
  //
  // public getCurrentEdgeIndex(): number {
  //   return this.currentEdgeFormatterIndex;
  // }
  //
  // public getSelectedProperty(): Object {
  //   return this.edgeFormatterProperties[this.currentEdgeFormatterIndex];
  // }
  //
  // public setEdgeFormatterProperty(index: number): void {
  //   if (index < 0 || index >= this.edgeFormatterProperties.length) {
  //     throw new Error("The provided index is not validf");
  //   }
  //
  //   this.currentEdgeFormatterIndex = index;
  // }
  //
  // public getAllNodeFormatters(): NodeFormatter[] {
  //   return this.nodeFormatters;
  // }
  //
  // public getSelectedNodeFormatter(): NodeFormatter {
  //   return this.nodeFormatters[this.currentNodeIndex].getDeepCopy();
  // }
  //
  // public getCurrentNodeIndex(): number {
  //   return this.currentNodeIndex;
  // }
  //
  // public setNodeFormatter(index: number): void {
  //   if (index < 0 || index >= this.nodeFormatters.length) {
  //     throw new Error("The provided index is not validf");
  //   }
  //
  //   this.currentNodeIndex = index;
  // }
}
