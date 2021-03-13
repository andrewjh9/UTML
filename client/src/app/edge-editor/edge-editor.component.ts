import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../model/edge";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";

@Component({
  selector: 'app-edge-editor',
  templateUrl: './edge-editor.component.html',
  styleUrls: ['./edge-editor.component.scss']
})
export class EdgeEditorComponent {
  @Input() edge?: Edge;
}
