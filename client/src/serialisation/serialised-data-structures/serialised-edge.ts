import {Position} from "../../model/position";
import {SerialisedLabel} from "./serialised-label";
import {EndStyle, LineStyle, LineType} from "../../model/edge";
import {SerialisedPosition} from "./serialised-position";

export interface SerialisedEdge {
  startNodeId?: number;
  endNodeId?: number;

  startPosition: SerialisedPosition | number;
  endPosition: SerialisedPosition | number;

  startLabel?: SerialisedLabel;
  middleLabel?: SerialisedLabel;
  endLabel?: SerialisedLabel;

  lineType?: LineType;
  lineStyle?: LineStyle;
  startStyle?: EndStyle;
  endStyle?: EndStyle;

  middlePositions: SerialisedPosition[];
}
