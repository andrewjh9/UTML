import {SerialisedPosition} from "./serialised-position";
import {EdgeLocation} from "../../model/edge/label";

export interface SerialisedLabel {
  offset: SerialisedPosition,
  edgeLocation: EdgeLocation;
  value: string
}
