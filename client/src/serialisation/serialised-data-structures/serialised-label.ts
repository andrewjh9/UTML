import {SerialisedPosition} from "./serialised-position";
import {EdgeLocation} from "../../model/label";

export interface SerialisedLabel {
  offset: SerialisedPosition,
  edgeLocation: EdgeLocation;
  value: string
}
