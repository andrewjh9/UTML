import {SerialisedLabel} from "../serialised-data-structures/serialised-label";
import {EdgeLocation, Label} from "../../model/label";
import {deserialisePosition} from "./deserialise-position";
import {Position} from "../../model/position";

export function deserialiseLabel(serialisedLabel: SerialisedLabel): Label {
  // todo: fix serialisation of labels
  return new Label(
    serialisedLabel.value,
    serialisedLabel.edgeLocation as EdgeLocation,
    deserialisePosition(serialisedLabel.offset)
  );
}
