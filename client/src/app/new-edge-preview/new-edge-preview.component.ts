import { Component, OnInit } from '@angular/core';
import {EdgeCreationService} from "../services/edge-creation-service.service";

@Component({
  selector: '[new-edge-preview]',
  templateUrl: './new-edge-preview.component.html',
  styleUrls: ['./new-edge-preview.component.scss']
})
export class NewEdgePreviewComponent {
  // Todo fix this implementation.
  constructor(public edgeCreationService: EdgeCreationService) { }

  edgeCreationIsActive(): boolean {
    return this.edgeCreationService.isActive();
  }

  getPoints(): string | undefined {
    let start: undefined | string  = this.edgeCreationService.startPosition?.toString(',', ' ');
    let end: undefined | string  = this.edgeCreationService.endPreview?.toString(',', ' ');
    console.log(start)
    console.log(end)
    if (start === undefined || end === undefined) {
      return undefined;
    }
    console.log(start)
    console.log(end)
    return `${start} ${end}`;
  }

}
