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
  public startNode?: Node;
  public endNode?: Node;
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
              startNode: Node | undefined = undefined, endNode: Node | undefined = undefined) {
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

  public getAllPoints(): Position[] {
    let result: Position[] = [];
    result.push(this.getStartPosition());
    result.push(...this.middlePositions);
    result.push(this.getEndPosition());
    return result;
  }

  private static getPosition(node: Node | undefined, positionOrDirection: Position | AttachmentDirection) {
    if (positionOrDirection instanceof Position) {
      return positionOrDirection;
    } else if (node === undefined) {
      console.error("Trying to position an edge according to AttachmentDirection but node is not set.");
      return new Position(0, 0);
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

  /**
   * Returns a point string that can be used to draw a polyline or path depending on the line type
   */
  public getPointString(): string {
    if (this.lineType == LineType.Line) {
      let result: string = "";
      result += this.getStartPosition().toString()
      for (let position of this.middlePositions) {
        result += position.toString();
      }
      result += this.getEndPosition().toString();
      return result;
    } else if (this.lineType == LineType.Arc){
      if (this.middlePositions.length != 1) {
        throw new Error(`An Arc typed edge should have exactly 1 middle position. Edge ${this} has
        ${this.middlePositions.length}.`);
      }

      let start: string = this.getStartPosition().toString(' ', ', ');
      let startWithoutEnd = this.getStartPosition().toString(' ', '')
      let middle: string = this.middlePositions[0].toString();
      let end: string = this.getEndPosition().toString();
      // Todo: Alter this in such a way that the curve goes through the point.
      // return `M ${startWithoutEnd} C ${start} ${middle} ${end}`;
      return `M ${startWithoutEnd} Q ${middle} ${end}`;

    } else {
      throw new Error(`EdgeFormatter ${this} has type ${this.lineType} for which points can not be computed.`);
    }
  }

  /**
   * Returns the a string which will be assigned to 'marker-start' attribute on the edge tag.
   * The result contains the id of a certain marker. Markers are defined in the 'arrow-marker' compontent.
   */
  public getStartMarker(): string {
    switch (this.startStyle) {
      case EndStyle.None:
        return "none";
      case EndStyle.SmallFilledArrow:
        return "url(#start-small-filled-arrow)";
      case EndStyle.FilledDiamond:
        return "url(#start-filled-diamond)";
      case EndStyle.UnfilledDiamond:
        return "url(#start-unfilled-diamond)";
      case EndStyle.LargeUnfilledArrow:
        return "url(#start-big-unfilled-arrow)";
    }
    return "none";
  }

  /**
   * Returns the a string which will be assigned to 'marker-end' attribute on the edge tag.
   * The result contains the id of a certain marker. Markers are defined in the 'arrow-marker' compontent.
   */
  public getEndMarker(): string {
    switch (this.endStyle) {
      case EndStyle.None:
        return "none";
      case EndStyle.SmallFilledArrow:
        return "url(#end-small-filled-arrow)";
      case EndStyle.FilledDiamond:
        return "url(#end-filled-diamond)";
      case EndStyle.UnfilledDiamond:
        return "url(#end-unfilled-diamond)";
      case EndStyle.LargeUnfilledArrow:
        return "url(#end-big-unfilled-arrow)";
    }
    return "none";
  }

  /**
   * Returns a string to be assigned to 'dash-array' attribute.
   * The result will be determined based upon the lineStyle field.
   */
  public getLineStyleString(): string {
    switch(this.lineStyle) {
      case LineStyle.Filled:
        return "none";
      case LineStyle.Dashed:
        return "12, 2"
      case LineStyle.Dotted:
        return "4, 4"
    }

    return "none";
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
  FilledDiamond,
  UnfilledDiamond,
  LargeUnfilledArrow
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
