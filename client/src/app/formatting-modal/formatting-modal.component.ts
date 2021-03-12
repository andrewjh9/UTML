import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectionService} from "../services/selection.service";
import {Node} from "../../model/node/node";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";

@Component({
  selector: 'app-formatting-modal',
  templateUrl: './formatting-modal.component.html',
  styleUrls: ['./formatting-modal.component.scss']
})
export class FormattingModalComponent {
  public node?: Node;
  constructor(public modal: NgbActiveModal,
              private selectionService: SelectionService,
              private deletionService: DeletionService,
              private cachingService: CachingService) {
    this.node = this.selectionService.getNode();
  }

  delete(): void {
    if (this.node) {
      this.deletionService.deleteNode(this.node);
      this.node = undefined;
    } else {
      throw new Error("Trying to delete an node from the node edit menu whilst no node is selected.");
    }
  }

  cache() {
    this.cachingService.save();
  }
}



