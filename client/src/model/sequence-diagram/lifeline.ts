export class Lifeline {
  public horizontalPosition: number;
  public name: string;

  public static readonly RENDERING_CONSTANTS = {
    'actorHeight': 75,
    'actorWidth': 150,
    'actorYOffset': 20,
    'actorBetweenOffset': 20,
    'activeBlockWidth': 16
  }


  constructor(horizontalPosition: number, name: string) {
    this.horizontalPosition = horizontalPosition;
    this.name = name;
  }

  public connections: number[] = [];
}
