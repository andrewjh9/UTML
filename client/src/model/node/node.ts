import {Position} from '../position';
import {SerialisedNode} from "../../serialisation/serialised-data-structures/serialised-node";

export abstract class Node {
  public width: number;
  public height: number;
  public position: Position;
  public text: string;
  public hasDoubleBorder: boolean;

  protected constructor(width: number, height: number, position: Position) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.text = "";
    this.hasDoubleBorder = false;
  }

  public getTextLines(): string[] {
    return this.text.split("\\n");
  }

  public abstract getDeepCopy(): Node;

  protected abstract getAllOffsets(): Position[];

  /**
   * Returns the node type name. This is used for serialisation.
   */
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

  public serialise(): SerialisedNode {
    return {
      type: this.getNodeTypeName(),
      width: this.width,
      height: this.height,
      position: this.position.serialise(),
      text: this.text,
      hasDoubleBorder: this.hasDoubleBorder
    }
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

