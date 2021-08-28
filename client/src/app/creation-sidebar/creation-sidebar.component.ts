import {Component, OnChanges, OnInit} from '@angular/core';
import {ClassNode} from "../../model/node/class-node";
import {Position} from "../../model/position";
import {Edge, EndStyle, LineType} from "../../model/edge/edge";
import {Node} from "../../model/node/node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {EllipseNode} from "../../model/node/ellipse-node";
import {DiamondNode} from "../../model/node/diamond-node";
import {HourglassNode} from "../../model/node/hourglass-node";
import {ActorNode} from "../../model/node/actor-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {EdgeCreationService} from "../services/edge-creation.service";
import {group} from "@angular/animations";
import {element} from "protractor";
import {SelectionService} from "../services/selection.service";
import {Label} from "../../model/edge/label";
import {DiagramContainerService} from "../services/diagram-container.service";
import {DeletionService} from "../services/deletion.service";
import {CourseSet, ShapeSet} from "../shapeset-management-modal/shapeset-management-modal.component";
import {ShapeSetContainerService} from "../services/shape-set-container.service";
import {DiagramComponent} from "../diagram/diagram.component";
import {CachingService} from "../services/caching/caching.service";
import {EditService} from "../services/edit.service";
import {ZoomService} from "../services/zoom.service";
import {logger} from "codelyzer/util/logger";
import {NavBarComponent} from "../nav-bar/nav-bar.component";

@Component({
  selector: 'creation-sidebar',
  templateUrl: './creation-sidebar.component.html',
  styleUrls: ['./creation-sidebar.component.scss']
})
export class CreationSidebarComponent implements OnInit {
  public static readonly WIDTH: number = 300;
  private selectedKeys: [string, string] | undefined;
  private selectedElement: Edge | Node | undefined = undefined;
  edgeCreationIsActive: boolean = false;
  shapeSets: CourseSet;
  selectedType: 'node' | 'edge' | 'neither' | 'nothing' = 'nothing';

  constructor(private dragDropCreationService: DragDropCreationService,
              private diagramContainerService: DiagramContainerService,
              private edgeCreationService: EdgeCreationService,
              private selectionService: SelectionService,
              private deletionService: DeletionService,
              private cachingService: CachingService,
              private editService: EditService,
              private zoomService: ZoomService,
              shapeSetContainerService: ShapeSetContainerService) {
    zoomService.resizeEmitter.subscribe((ignored: any) => this.setStyling());

    selectionService.selectedObservable.subscribe(list => {
      if (list.length === 1) {
        if (list[0] instanceof Node) {
          this.selectedType = 'node';
          return;
        } else if (list[0] instanceof Edge) {
          this.selectedType = 'edge';
          return;
        }
      } else if (list.length === 0) {
        this.selectedType = 'nothing';
        return;
      }

      this.selectedType = 'neither';
    });

    edgeCreationService.activityObservable.subscribe(active => {
      this.edgeCreationIsActive = active;
      if (!active) {
        this.selectedKeys = undefined;
      }
    });

    selectionService.selectedObservable.subscribe(selectedList => {
      if (selectedList.length === 1 && !(selectedList[0] instanceof Label)) {
        this.selectedElement = selectedList[0];
      } else {
        this.selectedElement = undefined;
      }
    });
    this.shapeSets = shapeSetContainerService.shapeSets.getValue();
    shapeSetContainerService.observable.subscribe(shapeSets => this.shapeSets = shapeSets);
  }

  private setStyling(): void {
    let height: number = window.innerHeight - DiagramComponent.NAV_HEIGHT;
    let left: number = window.innerWidth - CreationSidebarComponent.WIDTH;
    document.getElementById("creation-side-bar")!.style.overflow = "auto";
    document.getElementById("creation-side-bar")!.style.height = height + "px";
    document.getElementById("creation-side-bar")!.style.width = CreationSidebarComponent.WIDTH + "px";
    document.getElementById("creation-side-bar")!.style.position = "absolute";
    document.getElementById("creation-side-bar")!.style.left = left + "px";
    document.getElementById("creation-side-bar")!.style.top = DiagramComponent.NAV_HEIGHT + "px";
  }

  ngOnInit() {
    this.setStyling();
  }

  Object = Object;

  get groupKeys() {
    return Object.keys(this.shapeSets);
  }

  handleGenericMouseUp(): void {
    if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.cancel();
    }
  }

  handleEdgeMouseUp(groupKey: string, elementKey: string) {
    if (this.selectedKeys !== undefined && this.selectedKeys[0] === groupKey &&
      this.selectedKeys[1] === elementKey) {
      this.edgeCreationService.activate(this.shapeSets[groupKey].edges[elementKey])
    }
  }

  handleMouseDown(groupKey: string, elementKey: string, type: 'node' | 'edge'): void {
    this.selectionService.deselect();
    this.editService.deactivate();
    if (type === 'node') {
      this.dragDropCreationService.activate(this.shapeSets[groupKey].nodes[elementKey]);
    } else {
      this.dragDropCreationService.activate(this.shapeSets[groupKey].edges[elementKey]);
      this.selectedKeys = [groupKey, elementKey];
    }
  }

  isSelected(groupKey: string, edgeKey: string) {
    return this.selectedKeys !== undefined && this.selectedKeys[0] === groupKey && this.selectedKeys[1] === edgeKey;
  }

  left(): string {
    return `${this.zoomService.baseWidth - CreationSidebarComponent.WIDTH}px`;
  }

  topp(): string {
    return `${DiagramComponent.NAV_HEIGHT}px`;
  }

  get style() {
    console.log('Get styles is being called');
    console.log(this.zoomService.baseWidth - CreationSidebarComponent.WIDTH);
    let result =  {
      'left': this.zoomService.baseWidth - CreationSidebarComponent.WIDTH,
      'position': "absolute",
      'top': DiagramComponent.NAV_HEIGHT
    };
    console.log(result);
    return result;
  }

  getEdgeCursor() {
    switch (this.selectedType) {
      case "edge":
      case "nothing":
        return 'pointer';
      case "node":
      case "neither":
        return "disabled";
    }
  }

  getNodeCursor() {
    switch (this.selectedType) {
      case "node":
      case "nothing":
        return 'pointer';
      case "edge":
      case "neither":
        return "disabled";
    }
  }
}

