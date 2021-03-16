import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {DeletionService} from "../../services/deletion.service";
import {Node} from "../../../model/node/node";
import {CachingService} from "../../services/caching/caching.service";

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent {
  @Input() node?: Node;
}
