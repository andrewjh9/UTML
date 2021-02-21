import { Component, OnInit } from '@angular/core';
import {CreationFormatterSelectionService} from "../services/creation-formatter-selection.service";

@Component({
  selector: 'app-creation-menu',
  templateUrl: './creation-menu.component.html',
  styleUrls: ['./creation-menu.component.scss']
})
export class CreationMenuComponent {
  // Todo: Refactor when we refactor the creationFormatterSelection
  // JSON = JSON;
  // constructor(private creationFormatterSelectionService: CreationFormatterSelectionService) { }
  //
  // public getAllNodeFormatters(): NodeFormatter[] {
  //   return this.creationFormatterSelectionService.getAllNodeFormatters()
  // }
  //
  // public getSelectedNodeFormatterIndex(): number {
  //   return this.creationFormatterSelectionService.getCurrentNodeIndex();
  // }
  //
  // public setNodeFormatterIndex(index: number): void {
  //   this.creationFormatterSelectionService.setNodeFormatter(index);
  // }
  //
  // public getAllEdgeProperties(): Object[] {
  //   return this.creationFormatterSelectionService.getAllEdgeFormatterProperties()
  // }
  //
  // public setEdgeFormatterIndex(index: number): void {
  //   this.creationFormatterSelectionService.setEdgeFormatterProperty(index);
  // }
  //
  // public getSelectedEdgeFormatterIndex(): number {
  //   return this.creationFormatterSelectionService.getCurrentEdgeIndex();
  // }
}
