import { Component, OnInit } from '@angular/core';
import {DragSelectionService} from "../services/drag-selection.service";

@Component({
  selector: '[drag-select-preview]',
  templateUrl: './drag-select-preview.component.html',
  styleUrls: ['./drag-select-preview.component.scss']
})
export class DragSelectPreviewComponent {
  // Note that startX <= endX and startY <= endY
  startX: number = 10;
  startY: number = 10;
  endX: number = 110;
  endY: number = 300;

  visible: boolean = false;

  constructor(dragSelectionService: DragSelectionService) {
    dragSelectionService.startEndChangeEmitter.subscribe((coordinates: number[]) => {
      if (coordinates.length !== 4) {
        this.visible = false;
      } else {
        this.visible = true;
        this.startX = coordinates[0];
        this.startY = coordinates[1];
        this.endX = coordinates[2];
        this.endY = coordinates[3];

        // Swap to enforce startX <= endX and startY <= endY
        if (this.startX > this.endX) {
          this.endX = coordinates[0]
          this.startX = coordinates[2]
        }
        if (this.startY > this.endY) {
          this.endY = coordinates[1]
          this.startY = coordinates[3]
        }
      }
    });
  }
}
