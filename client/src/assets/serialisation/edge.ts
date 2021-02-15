import {Position} from "./position";
import {AttachmentDirection, Node, NodeFormatter} from "./node";
import {LabelFormatter} from "./label";

export interface Edge {
  startNode: Node;
  endNode: Node;
  startLabel?: string;
  endLabel?: string;
  middleLabel?: string;
  formatter?: EdgeFormatter;
}

export class EdgeFormatter {
  private readonly startNode: Node;
  private readonly endNode: Node;
  private _startPosition: Position | AttachmentDirection;
  private _endPosition: Position | AttachmentDirection;
  private _middlePositions: Position[] = [];
  private _lineType: LineType = LineType.Line;
  private _lineStyle: LineStyle = LineStyle.Filled;
  private _startStyle: EndStyle = EndStyle.None;
  private _endStyle: EndStyle = EndStyle.None;
  private _startLabelFormatter?: LabelFormatter;
  private _middleLabelFormatter?: LabelFormatter;
  private _endLabelFormatter?: LabelFormatter;


  constructor(startPosition: Position | AttachmentDirection, endPosition: Position | AttachmentDirection,
              startNode: Node, endNode: Node) {
    this._startPosition = startPosition;
    this._endPosition = endPosition;
    this.startNode = startNode;
    this.endNode = endNode;
  }


  get lineType(): LineType {
    return this._lineType;
  }

  set lineType(value: LineType) {
    this._lineType = value;
  }

  get lineStyle(): LineStyle {
    return this._lineStyle;
  }

  set lineStyle(value: LineStyle) {
    this._lineStyle = value;
  }

  get startStyle(): EndStyle {
    return this._startStyle;
  }

  set startStyle(value: EndStyle) {
    this._startStyle = value;
  }

  get endStyle(): EndStyle {
    return this._endStyle;
  }

  set endStyle(value: EndStyle) {
    this._endStyle = value;
  }

  get middlePositions(): Position[] {
    return this._middlePositions;
  }

  set middlePositions(value: Position[]) {
    this._middlePositions = value;
  }

// Note that accessors are not used here because because we want to deal with a Position from outside of the class,
  // but the positions are internally stored using Position | AttachmentDirection
  public getStartPosition(): Position {
    return EdgeFormatter.getPosition(this.startNode, this._startPosition);
  }

  public getEndPosition(): Position {
    return EdgeFormatter.getPosition(this.endNode, this._endPosition);
  }


  set startPosition(value: Position | AttachmentDirection) {
    this._startPosition = value;
  }

  set endPosition(value: Position | AttachmentDirection) {
    this._endPosition = value;
  }

  get startLabelFormatter(): LabelFormatter | undefined {
    return this._startLabelFormatter;
  }

  set startLabelFormatter(value: LabelFormatter | undefined) {
    this._startLabelFormatter = value;
  }

  get middleLabelFormatter(): LabelFormatter | undefined{
    return this._middleLabelFormatter;
  }

  set middleLabelFormatter(value: LabelFormatter | undefined) {
    this._middleLabelFormatter = value;
  }

  get endLabelFormatter(): LabelFormatter | undefined{
    return this._endLabelFormatter;
  }

  set endLabelFormatter(value: LabelFormatter | undefined) {
    this._endLabelFormatter = value;
  }

  private static getPosition(node: Node, positionOrDirection: Position | AttachmentDirection) {
    if (positionOrDirection instanceof Position) {
      return positionOrDirection;
    } else {
      let nodeFormatter: NodeFormatter | undefined = node.formatter;
      if(nodeFormatter) {
        return nodeFormatter.getAttachmentPointPosition(positionOrDirection as AttachmentDirection)
      } else {
        // todo: error handling
        console.error("The node to which this edge is connected has no formatter!");
        return new Position(0, 0);
      }
    }
  }
}

export enum LineType {
  Arc,
  Line
}

export enum LineStyle {
  Filled,
  Dotted,
  Dashed
}

export enum EndStyle {
  None,
  SmallFilledArrow,
}

// export interface Edge {
//   startNode?: Node;
//   endNode?: Node;
//   startPosition: Position;
//   endPosition: Position;
//   points: Position[];
//   label?: string;
//   arrowStyle: EndStyle;
//   edgeStyle: LineStyle;
// }
