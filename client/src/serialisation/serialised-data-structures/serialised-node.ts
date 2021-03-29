import {SerialisedPosition} from "./serialised-position";

export interface SerialisedNode {
  type: string;
  width: number;
  height: number;
  position: SerialisedPosition;
  text: string;
  hasDoubleBorder: boolean;
  styleObject: {[key: string]: string | number}
}

export interface SerialisedClassNode extends SerialisedNode {
  firstLine: number;
  secondLine: number | undefined;
}
