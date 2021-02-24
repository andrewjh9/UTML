import {Position} from '../position';

export abstract class Node {
  public width: number;
  public height: number;
  public position: Position;
  public texts: string[];

  protected constructor(width: number, height: number, position: Position) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.texts = [];
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

  public readonly styleObject: {
    [key: string]: number | string,
  } = {
    'fill': 'green',
    'stroke': 'black',
    'stroke-width': 2,
    'fill-opacity': 0.1,
    'stroke-opacity': 0.9
  };

  public get styleKeys(): string[] {
    return Object.keys(this.styleObject);
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

