import {EventEmitter, Injectable} from "@angular/core";
import {Node} from "../../model/node/node";
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";
import {CachingService} from "./caching/caching.service";
import {SelectionService} from "./selection.service";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {EditService} from "./edit.service";

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
  private selected: Array<Edge | Node> = [];

  constructor(private cachingService: CachingService,
              private selectionService: SelectionService,
              keyboardEventCallerService: KeyboardEventCallerService,
              private editService: EditService) {
    selectionService.selectedObservable.subscribe(value => this.selected = value);

    keyboardEventCallerService.addCallback(['Delete', 'keydown', 'any'], (event => {
      this.selected.forEach(selectedElem => {
        if (selectedElem instanceof Node) {
          if (!this.editService.isActive()) {
            this.deleteNode(selectedElem as Node);
          }
        } else if (selectedElem instanceof Edge) {
          this.deleteEdge(selectedElem as Edge);
        }
      });
    }));
  }

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

    this.diagram.edges.forEach(edge => {
      if (edge.startNode === node) {
        edge.startPosition = edge.getStartPosition();
      }
      if (edge.startNode === node) {
        edge.endPosition = edge.getEndPosition();
      }
    });

    const index = this.diagram.nodes.indexOf(node);
    if (index === -1) {
      throw new Error("Trying to delete a node that can not be found in the list of nodes!");
    } else {
      this.diagram.nodes.splice(index, 1);
    }

    if (this.selected.includes(node)) {
      this.selectionService.deselect();
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

    if (this.selected.includes(edge)) {
      this.selectionService.deselect();
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
