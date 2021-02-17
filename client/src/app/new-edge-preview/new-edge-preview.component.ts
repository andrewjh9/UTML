import { Component, OnInit } from '@angular/core';
import {EdgeCreationService} from "../services/edge-creation-service.service";

@Component({
  selector: 'app-new-edge-preview',
  templateUrl: './new-edge-preview.component.html',
  styleUrls: ['./new-edge-preview.component.scss']
})
export class NewEdgePreviewComponent {
  // Todo fix this implementation.
  constructor(private edgeCreationService: EdgeCreationService) { }

  edgeCreationIsActive(): boolean {
    return this.edgeCreationService.isActive();
  }

  getPoints(): string | undefined {
    let start: string | undefined = this.edgeCreationService.startPosition?.toString();
    let end: string | undefined = this.edgeCreationService.endPreview?.toString();
    if (start === undefined || end === undefined) {
      return undefined;
    }
    return `M ${start} L ${end}`;
  }

}
