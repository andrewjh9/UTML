import {Position} from '../position';
import {SerialisedNode} from "../../serialisation/serialised-data-structures/serialised-node";

export abstract class Node {
  private _width: number;
  private _height: number;
  private _position: Position;
  private _text: string;
  private _hasDoubleBorder: boolean;

  private static beforeCallbacks: (() => void)[] = [];
  private static afterCallbacks: (() => void)[] = [];


  public static addBeforeCallback(callback: () => void): void {
    Node.beforeCallbacks.push(callback);
  }

  public static addAfterCallback(callback: () => void): void {
    Node.afterCallbacks.push(callback);
  }

  private callBeforeCallbacks(): void {
    Node.beforeCallbacks.forEach(callback => callback());
  }

  private callAfterCallbacks(): void {
    Node.afterCallbacks.forEach(callback => callback());
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this.callBeforeCallbacks();
    this._width = value;
    this.callAfterCallbacks();
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this.callBeforeCallbacks();
    this._height = value;
    this.callAfterCallbacks();
  }

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this.callBeforeCallbacks();
    this._position = value;
    this.callAfterCallbacks();
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this.callBeforeCallbacks();
    this._text = value;
    this.callAfterCallbacks();
  }

  get hasDoubleBorder(): boolean {
    return this._hasDoubleBorder;
  }

  set hasDoubleBorder(value: boolean) {
    this.callBeforeCallbacks();
    this._hasDoubleBorder = value;
    this.callAfterCallbacks();
  }

  protected constructor(width: number, height: number, position: Position) {
    this._width = width;
    this._height = height;
    this._position = position;
    this._text = "";
    this._hasDoubleBorder = false;
  }

  public getTextLines(): string[] {
    return this._text.split("\\n");
  }

  public abstract getDeepCopy(): Node;

  protected abstract getAllOffsets(): Position[];

  /**
   * Returns the node type name. This is used for serialisation.
   */
  public abstract getNodeTypeName(): string;

  public getPositionOfAttachment(index: number): Position {
    return this.getAllAttachmentPoints()[index];
  }

  public isValidAttachment(index: number): boolean {
    return 0 <= index && index < this.getAllOffsets().length;
  }

  public getAllAttachmentPoints(): Position[] {
   return this.getAllOffsets().map(offset => Position.add(offset, this._position));
  }


  public getAllResizePoints(): Position[] {
    return [ new Position(this._width / 2, 0),//Up
      new Position(this._width, this._height / 2), //Right
      new Position(this._width / 2, this._height), //Down
      new Position(0, this._height / 2), // Left
      ]
  }

  public styleObject: {
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
      width: this._width,
      height: this._height,
      position: this._position.serialise(),
      text: this._text,
      hasDoubleBorder: this._hasDoubleBorder
    }
  }
}

type nodeChangeCallback = (oldNode: Node, newNode: Node) => void;

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

