import {Component, Input, OnInit} from '@angular/core';
import {SequenceDiagram} from "../../model/sequence-diagram/sequence-diagram";

@Component({
  selector: '[sequence-diagram]',
  templateUrl: './sequence-diagram.component.html',
  styleUrls: ['./sequence-diagram.component.scss']
})
export class SequenceDiagramComponent {
  @Input() diagram?: SequenceDiagram;
}
