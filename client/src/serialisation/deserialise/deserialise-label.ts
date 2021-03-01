import {SerialisedLabel} from "../serialised-data-structures/serialised-label";
import {Label} from "../../model/label";
import {deserialisePosition} from "./deserialise-position";

export function deserialiseLabel(serialisedLabel: SerialisedLabel): Label {
  return new Label(deserialisePosition(serialisedLabel.position), serialisedLabel.value);
}
