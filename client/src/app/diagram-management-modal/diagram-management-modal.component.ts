import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Node} from "../../model/node/node";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectionService} from "../services/selection.service";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {cd} from "../../model/examples/cd";
import {fsm} from "../../model/examples/fsm";
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {DiagramContainerService} from "../services/diagram-container.service";

@Component({
  selector: 'app-diagram-management-modal',
  templateUrl: './diagram-management-modal.component.html',
  styleUrls: ['./diagram-management-modal.component.scss']
})
export class DiagramManagementModalComponent implements OnInit{
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;

  dbEntries: Array<DatabaseDiagramEntry>;
  selectedIndex = -1;

  ngOnInit() {
    // Set the dbEntire here. This method is called anytime the modal is opnened.
  }

  get selectedDiagram(): Diagram | undefined {
    return this.selectedIndex === -1 ? undefined : deserialiseDiagram(this.dbEntries[this.selectedIndex].serialisedDiagram);
  }

  constructor(public modal: NgbActiveModal,
              private modalService: NgbModal,
              private diagramContainer: DiagramContainerService) {
    this.dbEntries = [
      {
        id: 1,
        title: 'My Own Class Diagram',
        lastModified: new Date(2021, 2, 15),
        visible: true,
        serialisedDiagram: cd.serialise()
      },
      {
        id: 2,
        title: 'My Own FSM',
        lastModified: new Date(2021, 2, 10),
        visible: false,
        serialisedDiagram: fsm.serialise()
      },
    ];
  }

  setDiagram() {
    if (this.selectedIndex !== -1) {
      this.diagramContainer.set(deserialiseDiagram(this.dbEntries[this.selectedIndex].serialisedDiagram));
    }
  }

  triggerDeleteModal() {
    this.modalService.open(this.deleteModal);
  }

  delete() {
    // Todo: Hook this up to the back-end
    this.dbEntries.splice(this.selectedIndex, 1);
  }

  updateChanges() {
    // Todo: Hook this up to the back-end
  }

  triggerEditModal() {
    this.modalService.open(this.editModal);
  }

  toggleVisibility() {
    if (this.selectedIndex !== -1) {
      this.dbEntries[this.selectedIndex].visible = !this.dbEntries[this.selectedIndex].visible;
    }
    // Todo: Call back-end
  }
}

// Todo: Match this up with the actual DB structure once it is known
export type DatabaseDiagramEntry = {
  id: number,
  title: string,
  lastModified: Date,
  visible: boolean,
  serialisedDiagram: SerialisedDiagram
}
