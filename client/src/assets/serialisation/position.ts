export class Position {
  constructor(public x: number, public y: number) {}

  public toString(separator: string = ', ', end: string = ' '): string {
    return `${this.x}${separator}${this.y}${end}`;
  }
}
