import {EventEmitter, Injectable} from "@angular/core";
import {Node} from "../../model/node/node";
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge/edge";
import {CachingService} from "./caching/caching.service";
import {SelectionService} from "./selection.service";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {EditService} from "./edit.service";
import {DiagramContainerService} from "./diagram-container.service";
import {Label} from "../../model/edge/label";

@Injectable({
  providedIn: "root"
})
/**
 * Service for deleting edges, nodes and unstructured edges.
 * This deletion happens both in the underlying data structure and in the corresponding components.
 * Before this service can be used the Diagram object is acts upon should be set using setDiagram.
 */
export class DeletionService {
  private diagram: Diagram;
  private selected: Array<Edge | Node | Label> = [];

  constructor(private cachingService: CachingService,
              private selectionService: SelectionService,
              keyboardEventCallerService: KeyboardEventCallerService,
              diagramContainerService: DiagramContainerService,
              private editService: EditService) {
    this.diagram = diagramContainerService.get();
    diagramContainerService.diagramObservable.subscribe(d => this.diagram = d);
    selectionService.selectedObservable.subscribe(value => this.selected = value);

    keyboardEventCallerService.addCallback(['Delete', 'keydown', 'any'], ignored => this.deleteSelected());
    editService.deleteLabelEmitter.subscribe((label: Label) => this.deleteLabel(label));
  }

  /**
   * Delete a node and any connected edges from the diagram data structure and its component from the DOM.
   * @param node Node to be deleted.
   */
  public deleteNode(node: Node, cache: boolean = true) {
    this.diagram.edges.forEach(edge => {
      if (edge.startNode === node) {
        edge.startPosition = edge.getStartPosition();
        edge.startNode = undefined;
      }
      if (edge.endNode === node) {
        edge.endPosition = edge.getEndPosition();
        edge.endNode = undefined;
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
    if (cache) {
      this.cachingService.save();
    }
  }

  /**
   * Delete an edge from the diagram data structure and its component from the DOM.
   * @param edge Edge to be deleted.
   */
  public deleteEdge(edge: Edge, cache: boolean = true) {
    const index = this.diagram!.edges.indexOf(edge);

    if (index === -1) {
      throw new Error("Trying to delete an edge that can not be found in the list of edges!");
    } else {
      this.diagram.edges.splice(index, 1);
    }

    if (this.selected.includes(edge)) {
      this.selectionService.deselect();
    }
    if (cache) {
      this.cachingService.save();
    }
  }

  public deleteLabel(label: Label, cache: boolean = true) {
    for (let edge of this.diagram.edges) {
      if (edge.startLabel === label) {
        edge.startLabel = undefined;
      } else if (edge.middleLabel === label) {
        edge.middleLabel = undefined;
      } else if (edge.endLabel === label) {
        edge.endLabel = undefined;
      }
    }

    if (cache) {
      this.cachingService.save();
    }
  }

  public deleteSelected() {
    this.selected.forEach(selectedElem => {
      if (selectedElem instanceof Node) {
        if (!this.editService.isActive()) {
          this.deleteNode(selectedElem as Node, false);
        }
      } else if (selectedElem instanceof Edge) {
        this.deleteEdge(selectedElem as Edge, false);
      } else if (selectedElem instanceof Label) {
        this.deleteLabel(selectedElem as Label, false);
      }
    });
    this.cachingService.save();
  }
}
