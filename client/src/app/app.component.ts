import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DownButton, KeyboardEventCallerService} from "./services/keyboard-event-caller.service";
import {EditService} from "./services/edit.service";
import {Diagram} from "../model/diagram";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {deserialiseDiagram} from "../serialisation/deserialise/deserialise-diagram";
import {DiagramContainerService} from "./services/diagram-container.service";
import {UserService} from "./services/user.service";
import {ErrorModalComponent} from "./error-modal/error-modal.component";
import {ErrorLauncherService} from "./services/error-launcher.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public loadDiagramId: String | undefined;

  constructor(private userService: UserService,
              private keyboardEventCallbackMap: KeyboardEventCallerService,
              private route: ActivatedRoute,
              private router: Router,
              private editService: EditService,
              private diagramContainer: DiagramContainerService,
              private http: HttpClient,
              private renderer: Renderer2,
              private errorLauncherService: ErrorLauncherService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        // @ts-ignore
        this.loadDiagramId = (val.state.root.firstChild.params.id);
        // @ts-ignore
        if(this.loadDiagramId){
          this.http.get("api/diagram/visible",{params: new HttpParams().set("id", String(this.loadDiagramId))}).subscribe(
            (data:any) => {
              if(data && data.serialisedDiagram) {
                this.diagramContainer.set(deserialiseDiagram(JSON.parse(data.serialisedDiagram)))
              } else{
                this.errorLauncherService.launch("Diagram could not be loaded, either doesn't exist or has not be made public")
                this.router.navigateByUrl("");
              }
            },error =>  {
              this.errorLauncherService.launch("Diagram could not be loaded.")
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
      (usersDiagramNames: any) => {
        let userDiagramNamesParsed: any = JSON.parse(usersDiagramNames);
        if(Array.isArray(userDiagramNamesParsed) && typeof userDiagramNamesParsed[0] == "string"){
          this.userService.addDiagramNames(userDiagramNamesParsed);
        }
        this.userService.setAuthenticated(true);
      }, (error) =>  {
        this.userService.clearDiagramNames();
        this.userService.setAuthenticated(false);
      }
    );
  }
}
