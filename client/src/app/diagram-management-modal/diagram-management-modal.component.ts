import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Node} from "../../model/node/node";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectionService} from "../services/selection.service";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";
import {cd} from "../../model/examples/cd";
import {fsm} from "../../model/examples/fsm";
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {DiagramContainerService} from "../services/diagram-container.service";
import axios from "axios";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";

@Component({
  selector: 'app-diagram-management-modal',
  templateUrl: './diagram-management-modal.component.html',
  styleUrls: ['./diagram-management-modal.component.scss']
})
export class DiagramManagementModalComponent implements OnInit{
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;

  dbEntries: Array<DatabaseDiagramEntry> | undefined;
  selectedIndex = -1;

  ngOnInit() {
     axios.get('/api/diagram/all/me').then(response => this.dbEntries =response.data);
  }

  get selectedDiagram(): Diagram | undefined {
    if(!this.dbEntries){
      return;
    }
    return this.selectedIndex === -1  ? undefined : deserialiseDiagram(this.dbEntries[this.selectedIndex].serialisedDiagram);
  }

  constructor(public modal: NgbActiveModal,
              private modalService: NgbModal,
              private diagramContainer: DiagramContainerService) {
  }

  setDiagram() {
    if (this.selectedIndex !== -1 && this.dbEntries != undefined) {
      this.diagramContainer.set(deserialiseDiagram(this.dbEntries[this.selectedIndex].serialisedDiagram));
    }
  }

  triggerDeleteModal() {
    this.modalService.open(this.deleteModal);
  }

  delete() {
    if(this.dbEntries && this.dbEntries[this.selectedIndex]) {
      axios.delete('/api/diagram/', {params: {"id": this.dbEntries[this.selectedIndex].id}}).then(response => {this.dbEntries = response.data; this.selectedIndex = -1});
    }
  }

  save (){
    // return axios.post('/api/diagram/',{serializedDiagram:"diagram"}).then(response => this.userFullName = response.data)
  }
  updateChanges() {
    if(this.dbEntries && this.dbEntries[this.selectedIndex]){
      axios.put('/api/diagram/', this.dbEntries[this.selectedIndex])
    }
  }

  triggerEditModal() {
    this.modalService.open(this.editModal);
  }

  toggleVisibility() {
    if (this.selectedIndex !== -1 && this.dbEntries) {
      axios.get('/api/diagram/toggle/visible', { params: { id: this.dbEntries[this.selectedIndex].id} })
    }
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
