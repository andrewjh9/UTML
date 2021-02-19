import {Component, Input, OnInit} from '@angular/core';
import {DeletionService} from "../services/deletion.service";
import {Node} from "../../assets/serialisation/node";

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent {
  @Input() node?: Node;

  constructor(private deletionService: DeletionService) {
  }

  delete(): void {
    if (this.node) {
      this.deletionService.deleteNode(this.node);
      this.node = undefined;
    } else {
      throw new Error("Trying to delete an node from the node edit menu whilst no node is selected.");
    }
  }
}
