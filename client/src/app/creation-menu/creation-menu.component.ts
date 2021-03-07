import { Component, OnInit } from '@angular/core';
import {CreationTypeSelectionService} from "../services/creation-type-selection.service";
import {Node} from "../../model/node/node";
@Component({
  selector: 'app-creation-menu',
  templateUrl: './creation-menu.component.html',
  styleUrls: ['./creation-menu.component.scss']
})
export class CreationMenuComponent {
  // Todo: Refactor when we refactor the creationFormatterSelection
  JSON = JSON;
  constructor(private creationTypeSelectionService: CreationTypeSelectionService) { }

  public getAllNodeTypes(): Node[] {
    return this.creationTypeSelectionService.getAllNodeTypes()
  }

  getNodeTypeNameFromIndex(index: number): string {
    return this.creationTypeSelectionService.getNodeTypeName(index);
  }

  public getSelectedNodeTypeIndex(): number {
    return this.creationTypeSelectionService.getCurrentNodeIndex();
  }

  public setNodeTypeIndex(index: number): void {
    this.creationTypeSelectionService.setNodeType(index);
  }

  public getAllEdgeProperties(): Object[] {
    return this.creationTypeSelectionService.getAllEdgeFormatterProperties()
  }

  public setEdgeFormatterIndex(index: number): void {
    this.creationTypeSelectionService.setEdgeFormatterProperty(index);
  }

  public getSelectedEdgeFormatterIndex(): number {
    return this.creationTypeSelectionService.getCurrentEdgeIndex();
  }
}
