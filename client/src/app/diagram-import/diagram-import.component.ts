import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";

@Component({
  selector: 'app-diagram-import',
  templateUrl: './diagram-import.component.html',
  styleUrls: ['./diagram-import.component.scss']
})
export class DiagramImportComponent {
  private file?: File;
  @Output() diagramEmitter: EventEmitter<Diagram> = new EventEmitter<Diagram>();

  constructor() { }

  onChange(event: any) {
    this.file = event!.target!.files[0];
  }

  onClick() {
    if (this.file === undefined) {
      alert("You have to upload a file first.");
    }

    this.file?.text()
      .then((diagramString: string) => {
        let diagramJSON = JSON.parse(diagramString);
        let diagram = deserialiseDiagram(diagramJSON as SerialisedDiagram);
        this.diagramEmitter.emit(diagram);
      })
      .catch(() => {
        alert('The file you are trying to upload can not be converted to a diagram.');
      });
  }
}
