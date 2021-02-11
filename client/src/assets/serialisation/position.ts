export class Position {
  constructor(public x: number, public y: number) {}

  public toString(separator: string = ', ', end: string = ' '): string {
    return `${this.x}${separator}${this.y}${end}`;
  }

  public static add(p1: Position, p2: Position): Position {
    return new Position(p1.x + p2.x, p1.y + p2.y);
  }

  public static multiply(scalar: number, position: Position): Position {
    return new Position(scalar * position.x, scalar * position.y);
  }
}
