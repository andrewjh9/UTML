import {SerialisedPosition} from "../serialisation/serialised-data-structures/serialised-position";

export class Position {
  constructor(public x: number, public y: number) {
  }

  public toString(separator: string = ', ', end: string = ' '): string {
    return `${this.x}${separator}${this.y}${end}`;
  }

  public getLength(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public getDeepCopy(): Position {
    return new Position(this.x, this.y);
  }

  public serialise(): SerialisedPosition {
    return {
      x: this.x,
      y: this.y
    }
  }

  public static add(p1: Position, p2: Position): Position {
    return new Position(p1.x + p2.x, p1.y + p2.y);
  }

  public static subtract(p1: Position, p2: Position): Position {
    return new Position(p1.x - p2.x, p1.y - p2.y);
  }

  public static multiply(scalar: number, position: Position): Position {
    return new Position(scalar * position.x, scalar * position.y);
  }

  public static getDistance(pos1: Position, pos2: Position): number {
    return this.subtract(pos1, pos2).getLength()
  }

  public static zero(): Position {
    return new Position(0, 0);
  }

  /**
   * Determines whether some given position lies between two other positions.
   * @param start The start of the area you want to check the middle to be in.
   * @param middle The position for which you want to check whether it lies between.
   * @param end TThe end of the area you want to check the middle to be in.
   * @returns true if the position lies inbetween, false otherwise.
   */
  public static liesBetween(start: Position, middle: Position, end: Position): boolean {
    return (((start.x <= middle.x) && (middle.x <= end.x)) || ((end.x <= middle.x) && (middle.x <= start.x))) &&
     (((start.y <= middle.y) && (middle.y <= end.y)) || ((end.y <= middle.y) && (middle.y <= start.y)));
  }
}
