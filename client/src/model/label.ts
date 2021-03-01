import {Position} from "./position";

export class Label {
  public position: Position;
  public value: string;

  constructor(position: Position, value: string) {
    this.position = position;
    this.value = value;
  }
}
