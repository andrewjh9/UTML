import {Node} from "./node";
import {Position} from "../position";

export abstract class PolylineNode extends Node {
  protected constructor(width: number, height: number, position: Position) {
    super(width, height, position);
  }

  public abstract getSVGPoints(): string;
}
