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
    // todo: implement
    return new Position(100, 100);
  }
}

export enum Shape {
    Rectangle,
    Circle,
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

