import {SerialisedPosition} from "../serialisation/serialised-position";

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
}
