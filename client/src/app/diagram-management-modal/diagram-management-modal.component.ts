import { Component, OnInit } from '@angular/core';
import {Node} from "../../model/node/node";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectionService} from "../services/selection.service";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {cd} from "../../model/examples/cd";
import {fsm} from "../../model/examples/fsm";
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";

@Component({
  selector: 'app-diagram-management-modal',
  templateUrl: './diagram-management-modal.component.html',
  styleUrls: ['./diagram-management-modal.component.scss']
})
export class DiagramManagementModalComponent {
  dbEntries: Array<DatabaseDiagramEntry>;
  selectedIndex = -1;

  get selectedDiagram(): Diagram | undefined {
    return this.selectedIndex === -1 ? undefined : deserialiseDiagram(this.dbEntries[this.selectedIndex].serialisedDiagram);
  }

  constructor(public modal: NgbActiveModal) {
    this.dbEntries = [
      {
        id: 1,
        title: 'My Own Class Diagram',
        lastModified: new Date(2021, 2, 15),
        serialisedDiagram: cd.serialise()
      },
      {
        id: 2,
        title: 'My Own FSM',
        lastModified: new Date(2021, 2, 10),
        serialisedDiagram: fsm.serialise()
      },
    ];
  }
}

// Todo: Match this up with the actual DB structure once it is known
export type DatabaseDiagramEntry = {
  id: number,
  title: string,
  lastModified: Date,
  serialisedDiagram: SerialisedDiagram
}
