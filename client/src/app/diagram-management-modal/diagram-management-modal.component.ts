import {Component, ElementRef, ErrorHandler, OnInit, ViewChild} from '@angular/core';
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
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";



@Component({
  selector: 'app-diagram-management-modal',
  templateUrl: './diagram-management-modal.component.html',
  styleUrls: ['./diagram-management-modal.component.scss']
})
export class DiagramManagementModalComponent implements OnInit, ErrorHandler{
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @ViewChild('editModal') editModal!: ElementRef;

  dbEntries: Array<DatabaseDiagramEntry> | undefined;
  selectedIndex = -1;

  ngOnInit() {
    this.http.get('/api/diagram/all/me').subscribe(
      (data:any) => {
        this.dbEntries = data;
      },error =>  {
        //TODO Open error modal or something
        this.handleError(error)
      })
  }

  get selectedDiagram(): Diagram | undefined {
    if(!this.dbEntries){
      return;
    }
    return this.selectedIndex === -1  ? undefined : deserialiseDiagram(JSON.parse(this.dbEntries[this.selectedIndex].serialisedDiagram));
  }

  constructor(public modal: NgbActiveModal,
              private modalService: NgbModal,
              private diagramContainer: DiagramContainerService, private http: HttpClient) {
  }

  setDiagram() {
    if (this.selectedIndex !== -1 && this.dbEntries != undefined) {
      this.diagramContainer.set(deserialiseDiagram(JSON.parse(this.dbEntries[this.selectedIndex].serialisedDiagram)));
    }
  }

  triggerDeleteModal() {
    this.modalService.open(this.deleteModal);
  }

  delete() {
    if(this.dbEntries && this.dbEntries[this.selectedIndex]) {
      this.http.delete('/api/diagram/',{params: new HttpParams().set("id", String(this.dbEntries[this.selectedIndex].id))}).subscribe(
        (data:any) => {
            this.dbEntries = data; this.selectedIndex = -1;
        },error =>  {
          //TODO Open error modal or something
          this.handleError(error)
      })
    }
  }

  save (){
    // return axios.post('/api/diagram/',{serializedDiagram:"diagram"}).then(response => this.userFullName = response.data)
  }
  updateChanges() {
    if(this.dbEntries && this.dbEntries[this.selectedIndex]){
      this.http.put('/api/diagram/',this.dbEntries[this.selectedIndex]).subscribe(
        (data:any) => {
        },error =>  {
          //TODO Open error modal or something
          this.handleError(error)
        })
    }
  }

  triggerEditModal() {
    this.modalService.open(this.editModal);
  }

  toggleVisibility() {
    if (this.selectedIndex !== -1 && this.dbEntries) {
      this.http.get('/api/diagram/toggle/visible',{params: new HttpParams().set("id",String(this.dbEntries[this.selectedIndex].id))}).subscribe(
        (data:any) => {
          if (this.dbEntries) {
            this.dbEntries[this.selectedIndex].visible = !this.dbEntries[this.selectedIndex].visible;
          }
        },error =>  {
          //TODO Open error modal or something
          this.handleError(error)
        })
    }
  }

  handleError(error: any) {
    console.log(error)
  }

}

// Todo: Match this up with the actual DB structure once it is known
export type DatabaseDiagramEntry = {
  id: number,
  title: string,
  lastModified: Date,
  visible: boolean,
  serialisedDiagram: string
}
