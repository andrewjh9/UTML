import {Position} from "./position";
import {SerialisedLabel} from "../serialisation/serialised-data-structures/serialised-label";
import {deserialiseLabel} from "../serialisation/deserialise/deserialise-label";

export class Label {
  public position: Position;
  public value: string;

  constructor(position: Position, value: string) {
    this.position = position;
    this.value = value;
  }

  public serialise(): SerialisedLabel {
    return {
      position: this.position.serialise(),
      value: this.value
    };
  }

  public getDeepCopy(): Label {
    return deserialiseLabel(this.serialise());
  }
}
