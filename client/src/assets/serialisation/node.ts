import {Position} from './position';
import {Edge} from "./edge";

export interface Node {
  texts: string[];
  formatter?: NodeFormatter;
}

export class NodeFormatter {
  public width: number;
  public height: number;
  public position: Position;
  public shape: Shape;


  constructor(width: number, height: number, position: Position, shape: Shape) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.shape = shape;
  }

  getAttachmentPointPosition(direction: AttachmentDirection): Position {
    if (this.shape == Shape.Rectangle) {
      let x: number;
      let y: number;
      if ([AttachmentDirection.North, AttachmentDirection.NorthEast, AttachmentDirection.NorthWest].includes(direction)) {
        y = this.position.y;
      } else if ([AttachmentDirection.South, AttachmentDirection.SouthEast, AttachmentDirection.SouthWest].includes(direction)) {
        y = this.position.y + this.height;
      } else {
        y = this.position.y + (this.height / 2);
      }

      if ([AttachmentDirection.West, AttachmentDirection.NorthWest, AttachmentDirection.SouthWest].includes(direction)) {
        x = this.position.x;
      } else if ([AttachmentDirection.East, AttachmentDirection.NorthEast, AttachmentDirection.SouthEast].includes(direction)) {
        x = this.position.x + this.width;
      } else {
        x = this.position.x + (this.width / 2);
      }
      return new Position(x, y);
    }  else if (this.shape == Shape.Ellipse) {
      let x: number;
      let y: number;
      if ([AttachmentDirection.North, AttachmentDirection.NorthEast, AttachmentDirection.NorthWest].includes(direction)) {
        y = this.position.y;
      } else if ([AttachmentDirection.South, AttachmentDirection.NorthEast, AttachmentDirection.NorthWest].includes(direction)) {
        y = this.position.y + this.height;
      } else {
        y = this.position.y + (this.height / 2);
      }

      if ([AttachmentDirection.West, AttachmentDirection.NorthWest, AttachmentDirection.NorthWest].includes(direction)) {
        x = this.position.x;
      } else if ([AttachmentDirection.East, AttachmentDirection.NorthEast, AttachmentDirection.SouthEast].includes(direction)) {
        x = this.position.x + this.width;
      } else {
        x = this.position.x + (this.width / 2);
      }
      return new Position(x, y);
    } else if (this.shape == Shape.Diamond) {
      switch(direction) {
        case AttachmentDirection.North:
          return new Position(this.position.x + this.width / 2, this.position.y);
        case AttachmentDirection.East:
          return new Position(this.position.x + this.width, this.position.y + this.height / 2);
        case AttachmentDirection.South:
          return new Position(this.position.x + this.width / 2, this.position.y + this.height);
        case AttachmentDirection.West:
          return new Position(this.position.x, this.position.y + this.height / 2);
      }
      return new Position(this.position.x, this.position.y);
    }
    return new Position(this.position.x, this.position.y);
  }
}

export enum Shape {
    Rectangle,
    Ellipse,
    Diamond
}

export enum AttachmentDirection {
  North,
  NorthEast,
  East,
  SouthEast,
  South,
  SouthWest,
  West,
  NorthWest
}

