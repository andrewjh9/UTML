import {Position} from "./position";
import {SerialisedLabel} from "../serialisation/serialised-data-structures/serialised-label";
import {deserialiseLabel} from "../serialisation/deserialise/deserialise-label";
import {Edge} from "./edge";

export class Label {
  constructor(public value: string,
              public readonly edgeLocation: EdgeLocation,
              public offset: Position = Position.zero(),
              public anchors: Array<PositionCallback> = []) {
  }

  private get anchor() {
    return this.anchors[this.edgeLocation as number]();
  }

  public get position() {
    if (this.anchors.length !== 3) {
      throw new Error('There should be exactly 3 acnhors.')
    }

    return Position.add(this.anchor, this.offset);
  }

  public set position(position: Position) {
    this.offset = Position.subtract(position, this.anchor);
  }

  public serialise(): SerialisedLabel {
    return {
      offset: this.offset.serialise(),
      edgeLocation: this.edgeLocation,
      value: this.value
    };
  }

  public getDeepCopy(): Label {
    let result =  deserialiseLabel(this.serialise());
    result.anchors = this.anchors;
    return result;
  }
}

export type PositionCallback = () => Position;

export enum EdgeLocation {
  START = 0,
  MIDDLE = 1,
  END = 2
}
