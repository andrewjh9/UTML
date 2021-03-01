import {SerialisedPosition} from "../serialised-data-structures/serialised-position";
import {Position} from "../../model/position";

export function deserialisePosition(serialisedPosition: SerialisedPosition): Position {
  return new Position(serialisedPosition.x, serialisedPosition.y);
}
