import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SelectionService} from "../services/selection.service";
import {Edge} from "../../model/edge/edge";
import {Node} from "../../model/node/node";
import {EdgeCreationService} from "../services/edge-creation.service";
import {ZoomService} from "../services/zoom.service";
import {EditService} from "../services/edit.service";
import {Label} from "../../model/edge/label";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'hint-overlay',
  templateUrl: './hint-overlay.component.html',
  styleUrls: ['./hint-overlay.component.scss']
})
export class HintOverlayComponent implements AfterViewInit {
  WIDTH = 400;
  HEIGHT = 200;
  private windowHeight: number = 1080;
  private selectedList: Array<Node | Edge | Label> = [];
  mode: 'node' | 'edge' | 'label' | 'multiple' | 'nothing' | 'edge-creation' | 'text-edit' = 'node';

  constructor(private selectionService: SelectionService,
              private edgeCreationService: EdgeCreationService,
              private zoomService: ZoomService,
              private editService: EditService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.selectedList = selectedList;
      this.setMode();
    });

    zoomService.resizeEmitter.subscribe((ignored: any) => this.windowHeight = window.innerHeight);
    edgeCreationService.activityObservable.subscribe((ignored: any) => this.setMode());
    editService.editElementObservable.subscribe((ignored: any) => this.setMode());
  }

  ngAfterViewInit(): void {
    this.windowHeight = window.innerHeight;
  }

  private setMode(): void {
    if (this.editService.isActive()) {
      this.mode = 'text-edit';
    } else if (this.edgeCreationService.isActive()) {
      this.mode = 'edge-creation';
    } else if (this.selectionService.isEdge()) {
      this.mode = 'edge';
    } else if (this.selectionService.isNode()) {
      this.mode = 'node';
    } else if (this.selectedList.length > 1) {
      this.mode = 'multiple';
    } else if (this.selectedList.length === 1 && this.selectedList[0] instanceof Label) {
      this.mode = 'label';
    } else {
      this.mode = 'nothing'
    }
    console.log(this.mode);

  }

  get styleObject() {
    return {
      top: (this.windowHeight - this.HEIGHT) + 'px',
      height: this.HEIGHT + 'px',
      width: this.WIDTH + 'px',
    }
  }
}
