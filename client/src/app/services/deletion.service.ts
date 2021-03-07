import {EventEmitter, Injectable} from "@angular/core";
import {Node} from "../../model/node/node";
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: "root"
})
/**
 * Service for deleting edges, nodes and unstructured edges.
 * This deletion happens both in the underlying data structure and in the corresponding components.
 * Before this service can be used the Diagram object is acts upon should be set using setDiagram.
 */
export class DeletionService {
  private diagram?: Diagram;

  constructor(private cachingService: CachingService) { }

  /**
   * Delete a node and any connected edges from the diagram data structure and its component from the DOM.
   * @throws Throws an error if the diagram is not set, the node can not be found in the diagram.nodes list
   *         or if any of the edges connecting to this node can not be found.
   * @param node Node to be deleted.
   */
  public deleteNode(node: Node) {
    if (this.diagram === undefined) {
      throw new Error("Trying to use deletion service whilst the diagram is undefined");
    }
    let edgesToBeDeleted: Edge[] = this.diagram.edges.filter((edge: Edge) => {
      return edge.startNode === node || edge.endNode === node;
    });

    edgesToBeDeleted.forEach((edge: Edge) => {
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

    this.cachingService.save();
  }

  /**
   * Delete an edge from the diagram data structure and its component from the DOM.
   * @throws Throws an error if the diagram is not set or if the edge can not be found in diagram.edges.
   * @param edge Edge to be deleted.
   */
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

    this.cachingService.save();
  }

  /**
   * Set the diagram on which deletion will happen.
   * This function needs to be called at least once with a valid diagram before the deletionService can be used.
   * This setting needs to happen each time the reference to the diagram is changed.
   * @param diagram Diagram on which deletion needs to happen.
   */
  public setDiagram(diagram: Diagram): void {
    this.diagram = diagram;
  }
}
