import {PolylineNode} from "./polyline-node";
import {Position} from "../position";
import {Node} from "./node";

export class DiamondNode extends PolylineNode {
  constructor(width: number, height: number, position: Position) {
    super(width, height, position);
  }

  protected getAllOffsets(): Position[] {
    return [
      new Position(this.width / 2, 0),
      new Position(this.width / 2, this.height),
      new Position(0, this.height / 2),
      new Position(this.width, this.height / 2)
    ];
  }

  getDeepCopy(): Node {
    return new DiamondNode(this.width, this.height, this.position.getDeepCopy());
  }

  getSVGPoints(): string {    
    let points: string[] = [
      new Position(this.position.x + this.width / 2, this.position.y),
      new Position(this.position.x + this.width, this.position.y + this.height / 2),
      new Position(this.position.x + this.width / 2, this.position.y + this.height),
      new Position(this.position.x, this.position.y + this.height / 2),
      new Position(this.position.x + this.width / 2, this.position.y)
    ].map((pos: Position) => pos.toString());
    return points.join();
  }
}
