import {Position} from '../position';

export abstract class Node {
  public width: number;
  public height: number;
  public position: Position;
  public text: string;

  protected constructor(width: number, height: number, position: Position) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.text = "";
  }

  public getTextLines(): string[]{
    return this.text.split("\\n");
  }
  public abstract getDeepCopy(): Node;

  protected abstract getAllOffsets(): Position[];

  abstract getNodeTypeName(): string;

  public getPositionOfAttachment(index: number): Position {
    return this.getAllAttachmentPoints()[index];
  }

  public isValidAttachment(index: number): boolean {
    return 0 <= index && index < this.getAllOffsets().length;
  }

  public getAllAttachmentPoints(): Position[] {
   return this.getAllOffsets().map(offset => Position.add(offset, this.position));
  }


  public getAllResizePoints(): Position[] {
    return [ new Position(this.width / 2, 0),//Up
      new Position(this.width, this.height / 2), //Right
      new Position(this.width / 2, this.height), //Down
      new Position(0, this.height / 2), // Left
      ]
  }
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

