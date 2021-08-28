import {Edge} from "./edge/edge";
import {Node} from "./node/node";
import {SerialisedDiagram} from "../serialisation/serialised-data-structures/serialised-diagram";
import {Position} from "./position";


export class Diagram {
  public edges: Edge[];
  public nodes: Node[];


  constructor(nodes: Node[] = [], edges: Edge[] = []) {
    this.edges = edges;
    this.nodes = nodes;
  }

  public getDimensions(): {
    topY: number,
    bottomY: number,
    leftX: number,
    rightX: number,
    width: number,
    height: number
  } {
    if (this.edges.length === 0 && this.nodes.length === 0) {
      return {
        topY: 0,
        bottomY: 0,
        leftX: 0,
        rightX: 0,
        width: 0,
        height: 0
      }
    }

    let result = {
      topY: 5000,
      bottomY: -5000,
      leftX: 5000,
      rightX: -5000,
      height: 0,
      width: 0,
    }

    const update = (x: number, y: number) => {
      if (x >= result.rightX) { result.rightX = x; }
      if (x <= result.leftX) { result.leftX = x; }
      if (y >= result.bottomY) { result.bottomY = y; }
      if (y <= result.topY) { result.topY = y; }
    }

    const updatePos = (pos: Position) => update(pos.x, pos.y);

    this.nodes.forEach(node => {
      updatePos(node.position);
      updatePos(Position.add(new Position(node.width, node.height), node.position));
    });

    this.edges.forEach(edge => edge.getAllPoints().forEach(pos => updatePos(pos)));

    result.height = result.bottomY - result.topY;
    result.width = result.rightX - result.leftX;
    return result;
  }

  public serialise(): SerialisedDiagram {
    let serialisedNodes = this.nodes.map((node) => node.serialise());
    let serialisedEdges = this.edges.map((edge) => edge.serialise());

    for (let edgeIndex = 0; edgeIndex < this.edges.length; edgeIndex++) {
      let serialisedEdge = serialisedEdges[edgeIndex];
      let actualEdge = this.edges[edgeIndex];

      if (actualEdge.startNode !== undefined) {
        serialisedEdge.startNodeId = this.nodes.indexOf(actualEdge.startNode);
      }

      if (actualEdge.endNode !== undefined) {
        serialisedEdge.endNodeId = this.nodes.indexOf(actualEdge.endNode);
      }
    }
    return {
      edges: serialisedEdges,
      nodes: serialisedNodes
    }
  }
}
