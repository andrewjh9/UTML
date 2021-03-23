/**
 * Determines whether a given point lies on a given line segment within some margin of error.
 * The margin of error is there because the user can not perfectly click on the line.
 * @param point Point for which it will be checked whether it lies on the segment.
 * @param start Start of the line segment.
 * @param end End of the line segment.
 * @returns True if the point approximately lies on the line segment, false otherwise.
 */
import {Position} from "../../../model/position";

export function liesOnSegment(point: Position, start: Position, end: Position): boolean {
  let actualSegment: Position = Position.subtract(end, start);
  let ourSegment: Position = Position.subtract(point, start);
  let angle: number = Math.atan2(-actualSegment.y, actualSegment.x);
  let rotationMatrix: number[][] = [[Math.cos(angle), Math.sin(angle)],[-Math.sin(angle), Math.cos(angle)]];
  let baseVector: number[] = matrixVectorMult(rotationMatrix, [actualSegment.x, actualSegment.y]);
  let transformedPoint: number[] = matrixVectorMult(rotationMatrix, [ourSegment.x, ourSegment.y]);
  return (Math.abs(transformedPoint[1]) < 10 && (transformedPoint[0] >= 0) && (transformedPoint[0] <= baseVector[0]));
}

export function matrixVectorMult(matrix: number[][], vector: number[]): number[] {
  return [matrix[0][0] * vector[0] + matrix[1][0] * vector[1], matrix[0][1] * vector[0] + matrix[1][1] * vector[1]]
}
