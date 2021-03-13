import {Node} from "./node";
import {Position} from "../position";

export class EllipseNode extends Node {
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

  public getDeepCopy(): Node {
    let result =  new EllipseNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    result.hasDoubleBorder = this.hasDoubleBorder;
    return result;
  }

  public getNodeTypeName(): string {
    return "Ellipse";
  }

  public preview: string = `<ellipse cx="${Node.PREVIEW_WIDTH / 2}"
cy="${Node.DEFAULT_PREVIEW_HEIGHT / 2 + 1}"
rx="${Node.DEFAULT_PREVIEW_HEIGHT / 2 - 2}"
ry="${Node.DEFAULT_PREVIEW_HEIGHT / 2 - 2}"
style="fill: none; stroke-width: 2; stroke: black">
</ellipse>`;
}
