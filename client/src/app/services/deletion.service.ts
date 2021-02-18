import {EventEmitter, Injectable} from "@angular/core";
import {Node} from "../../assets/serialisation/node";
import {Diagram} from "../../assets/serialisation/diagram";
import {Edge, EdgeFormatter} from "../../assets/serialisation/edge";

@Injectable({
  providedIn: "root"
})
// Todo: Check if this also removes the compontents fully.
export class DeletionService {
  // public deleteNodeEvent: EventEmitter<Node> = new EventEmitter<Node>();
  private diagram?: Diagram;

  public deleteNode(node: Node) {
    if (this.diagram === undefined) {
      throw new Error("Trying to use deletion service whilst the diagram is undefined");
    }
    let edgesToBeDeleted: Edge[] = this.diagram.edges.filter((edge: Edge) => {
      return edge.startNode === node || edge.endNode == node;
    });

    edgesToBeDeleted.forEach((edge: Edge) => {1
      const index = this.diagram!.edges.indexOf(edge);
      this.diagram!.edges.splice(index, 1);
    })

    const index = this.diagram.nodes.indexOf(node);
    console.log(`Deleting node with index ${index}.`);
    if (index === -1) {
      throw new Error("Trying to delete a node that can not be found in the list of nodes!");
    } else {
      this.diagram.nodes.splice(index, 1);
    }
  }

  public deleteEdge(edge: Edge) {
    if (this.diagram === undefined) {
      throw new Error("Trying to use deletion service whilst the diagram is undefined");
    }

    const index = this.diagram!.edges.indexOf(edge);

    if (index === -1) {
      throw new Error("Trying to delete an edge that can not be found in the list of edges!");
    } else {
      this.diagram.edges.splice(index, 1);
    }
  }

  public deleteEdgeFormatter(edgeFormatter: EdgeFormatter) {
    // todo: Implement this
    // this can not currently be implemented as edge formatter are not explicitly stored in the diagram right now.
  }

  public setDiagram(diagram: Diagram): void {
    this.diagram = diagram;
  }
}
