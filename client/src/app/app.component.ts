import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {DownButton, KeyboardEventCallerService} from "./services/keyboard-event-caller.service";
import {EditService} from "./services/edit.service";
import {Diagram} from "../model/diagram";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {deserialiseDiagram} from "../serialisation/deserialise/deserialise-diagram";
import {DiagramContainerService} from "./services/diagram-container.service";
import {UserService} from "./services/user.service";
import {ZoomService} from "./services/zoom.service";
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
              private zoomService: ZoomService,
              private errorLauncherService: ErrorLauncherService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if(val instanceof RoutesRecognized && val.state.root.firstChild && val.state.root.firstChild.params.id) {
        this.loadDiagramId = val.state.root.firstChild.params.id;
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

    this.renderer.listen('window', 'resize', () => {
      console.log(`${window.innerWidth} - ${window.innerHeight}`);
      this.zoomService.handleResize(window.innerWidth, window.innerHeight);
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
      (response: any) => {
        let responseObj: {email: string[], diagramNames: string[]} = JSON.parse(response);
        if(Array.isArray(response.diagramNames) && typeof response.diagramName[0] == "string"){
          this.userService.addDiagramNames(response.diagramNames);
        }
        this.userService.setUserEmail(responseObj.email[0]);
        this.userService.setAuthenticated(true);
      }, (error) =>  {
        this.userService.clearDiagramNames();
        this.userService.setAuthenticated(false);
      }
    );
  }
}
