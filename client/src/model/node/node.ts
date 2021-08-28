import {Position} from '../position';
import {SerialisedNode} from "../../serialisation/serialised-data-structures/serialised-node";
import {HighlightType} from "../../app/services/feedback/local/feedback";

export abstract class Node {
  private _width: number;
  private _height: number;
  private _position: Position;
  private _text: string;
  private _hasDoubleBorder: boolean;
  protected _transparent: boolean = false;
  public highlight: HighlightType = 'none';

  get transparent(): boolean {
    return this._transparent;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get hasDoubleBorder(): boolean {
    return this._hasDoubleBorder;
  }

  set hasDoubleBorder(value: boolean) {
    this._hasDoubleBorder = value;
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
      new Position(this.width, 0), //up-right
      new Position(this._width, this._height / 2), //Right
      new Position(this.width, this.height), // right,down
      new Position(this._width / 2, this._height), //Down
      new Position(0, this._height), //Down,left
      new Position(0, this._height / 2), // Left
      new Position(0, 0), // up, left
    ];
  }

  // Be careful with settings the fill to none as that will cause the body of the node to not be clickable.
  public styleObject: {
    [key: string]: number | string,
  } = {
    'fill': 'white',
    'stroke': 'black',
    'stroke-width': 2,
    'fill-opacity': 1,
    'stroke-opacity': 0.75,
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
      hasDoubleBorder: this._hasDoubleBorder,
      styleObject: Node.copyStyleObject(this.styleObject)
    }
  }

  public static copyStyleObject(obj: StyleObject): StyleObject {
    return Object.entries(obj).reduce(
      (obj, [key, value]) => {
        obj[key] = value
        return obj;
      },
      {} as StyleObject
    );
  }
}

export type StyleObject = {
  [key: string]: string | number;
}
