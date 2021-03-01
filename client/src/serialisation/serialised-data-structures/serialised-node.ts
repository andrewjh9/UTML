import {SerialisedPosition} from "./serialised-position";

export interface SerialisedNode {
  type: string;
  width: number;
  height: number;
  position: SerialisedPosition;
  text: string;
  hasDoubleBorder: boolean;
}
