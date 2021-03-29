import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DownButton, KeyboardEventCallerService} from "./services/keyboard-event-caller.service";
import {EditService} from "./services/edit.service";
import {Diagram} from "../model/diagram";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {deserialiseDiagram} from "../serialisation/deserialise/deserialise-diagram";
import {DiagramContainerService} from "./services/diagram-container.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public userFullName: string | undefined;
  public userDiagrams: Diagram[] | undefined;
  public loadDiagramId: Number | undefined;

  constructor(private renderer: Renderer2, private keyboardEventCallbackMap: KeyboardEventCallerService, private route: ActivatedRoute, private router: Router, private editService: EditService, private diagramContainer: DiagramContainerService, private http: HttpClient) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        // @ts-ignore
        this.loadDiagramId = Number.parseInt(val.state.root.firstChild.params.id);
        console.log(this.loadDiagramId)
        // @ts-ignore
        if(this.loadDiagramId){
          this.http.get("api/diagram/visible",{params: new HttpParams().set("id", String(this.loadDiagramId))}).subscribe(
            (data:any) => {
              if(data.serialisedDiagram) {
                this.diagramContainer.set(deserialiseDiagram(data.serialisedDiagram))
              } else{
                window.alert("Diagram could not be loaded");
                this.router.navigateByUrl("");
              }
            },error =>  {
              //TODO Open error modal or something
              this.handleError(error)
            })
         }
      }
    });
  }

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      if (event.key == "Backspace" && this.editService.isActive()) {
        event.preventDefault();
      }
      let downButton = AppComponent.getDownButton(event);
      if (this.editService.isActive()) {
        this.editService.handleKeyPressed(event.key, event.ctrlKey);
      } else {
        this.keyboardEventCallbackMap.executeCallbacks([event.key, "keydown", downButton], event);
      }
    });

    this.renderer.listen('window', 'keyup', (event: KeyboardEvent) => {
      let downButton = AppComponent.getDownButton(event);
      this.keyboardEventCallbackMap.executeCallbacks([event.key, "keyup", downButton], event);
    });

    this.isLoggedIn();
  }

  private static getDownButton(event: KeyboardEvent): DownButton {
    let downButton: DownButton = 'none';
    if (event.ctrlKey) {
      downButton = 'ctrl';
    } else if (event.shiftKey) {
      downButton = 'shift';
    } else if (event.altKey) {
      downButton = 'alt';
    }
    return downButton;
  }

  private isLoggedIn() {
    this.http.get("/me",{  responseType: 'text'
      }).subscribe(
      (data:any) => {
        if(data == null ){
          this.userFullName = undefined;
        } else{
          this.userFullName = data
        }
      },error =>  {
        //TODO Open error modal or something
        this.handleError(error)
      }
    );

  }

  handleError(error: any) {
    console.log(error)
  }


}
