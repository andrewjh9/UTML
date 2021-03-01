import {Position} from "./position";

export class LabelFormatter {
  /** The center position of the label */
  private _position: Position;

  constructor(position: Position) {
    this._position = position;
  }

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
  }
}
