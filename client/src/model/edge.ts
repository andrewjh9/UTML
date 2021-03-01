import {Position} from "./position";
import {Node} from "./node/node";
import {Label} from "./label";
import {SerialisedEdge} from "../serialisation/serialised-edge";

export class Edge {
  public startNode?: Node;
  public endNode?: Node;

  public startPosition: Position | number;
  public middlePositions: Position[] = [];
  public endPosition: Position | number;

  public lineType: LineType = LineType.Line;
  public lineStyle: LineStyle = LineStyle.Filled;
  public startStyle: EndStyle = EndStyle.None;
  public endStyle: EndStyle = EndStyle.None;

  public startLabel?: Label;
  public middleLabel?: Label;
  public endLabel?: Label;

  constructor(startPosition: Position | number, endPosition: Position | number,
              startNode: Node | undefined = undefined, endNode: Node | undefined = undefined) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  public addStartLabel(value: string = 'start') {
    this.startLabel = new Label(this.getStartPosition(), value);
  }

  public addMiddleLabel(value: string = 'middle') {
    this.middleLabel = new Label(
      Position.multiply(0.5, Position.add(this.getStartPosition(), this.getEndPosition())),
      value
    );
  }

  public addEndLabel(value: string = 'end') {
    this.endLabel = new Label(this.getEndPosition(), value);
  }

  public getStartPosition(): Position {
    return Edge.getPosition(this.startNode, this.startPosition);
  }

  public getEndPosition(): Position {
    return Edge.getPosition(this.endNode, this.endPosition);
  }

  public getAllPoints(): Position[] {
    let result: Position[] = [];
    result.push(this.getStartPosition());
    result.push(...this.middlePositions);
    result.push(this.getEndPosition());
    return result;
  }

  private static getPosition(node: Node | undefined, positionOrDirection: Position | number) {
    if (positionOrDirection instanceof Position) {
      return positionOrDirection;
    } else if (node === undefined) {
      console.error("Trying to position an edge according to number but node is not set.");
      return new Position(0, 0);
    } else {
      if (node) {
        return node.getPositionOfAttachment(positionOrDirection)
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
      result += this.getStartPosition().toString();
      for (let position of this.middlePositions) {
        result += position.toString();
      }
      result += this.getEndPosition().toString();
      return result;
    } else if (this.lineType == LineType.Arc) {
      if (this.middlePositions.length != 1) {
        throw new Error(`An Arc typed edge should have exactly 1 middle position. Edge ${this} has
        ${this.middlePositions.length}.`);
      }
      let start: Position = this.getStartPosition();
      let middle: Position = this.middlePositions[0];
      let end: Position = this.getEndPosition();

      let A: number = Position.getDistance(end, middle);
      let B: number = Position.getDistance(middle, start);
      let C: number = Position.getDistance(start, end);

      let angle: number = Math.acos((A * A + B * B - C * C) / (2 * A * B));

      //calc radius of circle
      let K: number = .5 * A * B * Math.sin(angle);
      let r: number = A * B * C / 4 / K;
      r = Math.round(r * 1000) / 1000;

      //large arc flag
      let laf: number = +(Math.PI / 2 > angle);

      //sweep flag
      let saf: number = +((end.x - start.x) * (middle.y - start.y) - (end.y - start.y) * (middle.x - start.x) < 0);

      return ['M', start.x, start.y, 'A', r, r, 0, laf, saf, end.x, end.y].join(' ');

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
    switch (this.lineStyle) {
      case LineStyle.Filled:
        return "none";
      case LineStyle.Dashed:
        return "12, 2"
      case LineStyle.Dotted:
        return "4, 4"
    }

    return "none";
  }

  public setDefaultMiddlePointOnArc(): void {
    // Arcs require a middle point for their rendering.
    // By default we place this in the middle between start and end and then plus 0.25 of the vector perpendicular to
    // end - start.
    if (this.lineType !== LineType.Arc) {
      throw new Error("This method should only be called on arcs.");
    }

    let start = this.getStartPosition();
    let end = this.getEndPosition();
    let between = Position.subtract(end, start)
    let betweenPerpendicular = new Position(-between.y, between.x)
    let middle = Position.multiply(0.5, Position.add(start, end));
    let position = Position.add(middle, Position.multiply(0.25, betweenPerpendicular))
    this.middlePositions.push(position);
  }

  public serialise(): SerialisedEdge {
    return {
      startPosition: this.startPosition,
      endPosition: this.endPosition,
    };
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
