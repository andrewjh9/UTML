import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SelectionService} from "../services/selection.service";
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";
import {EdgeCreationService} from "../services/edge-creation.service";
import {ZoomService} from "../services/zoom.service";

@Component({
  selector: 'hint-overlay',
  templateUrl: './hint-overlay.component.html',
  styleUrls: ['./hint-overlay.component.scss']
})
export class HintOverlayComponent implements AfterViewInit {
  WIDTH = 400;
  HEIGHT = 200;
  private windowHeight: number = 1080;
  mode: 'node' | 'edge' | 'nothing' | 'edge-creation' = 'node';

  constructor(selectionService: SelectionService, edgeCreationService: EdgeCreationService, zoomService: ZoomService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      if (selectedList.length === 1) {
        if (selectedList[0] instanceof Node) {
          this.mode = 'node';
          return;
        } else if (selectedList[0] instanceof Edge) {
          this.mode = 'edge';
          return;
        }
      }

      this.mode = 'nothing';

      zoomService.resizeEmitter.subscribe((ignored: any) => this.windowHeight = window.innerHeight);
    });

    edgeCreationService.activityObservable.subscribe(isActive => this.mode = isActive ? 'edge-creation' : 'nothing');
  }

  ngAfterViewInit(): void {
    this.windowHeight = window.innerHeight;
  }

  get styleObject() {
    return {
      top: (this.windowHeight - this.HEIGHT) + 'px',
      height: this.HEIGHT + 'px',
      width: this.WIDTH + 'px',
    }
  }
}
