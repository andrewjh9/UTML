import {AfterViewInit, Component, Renderer2} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DownButton, KeyboardEventCallerService} from "./services/keyboard-event-caller.service";
import axios from 'axios';
import {Diagram} from "../model/diagram";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public userFullName: string | undefined;
  public userDiagrams: Diagram[] | undefined;
  private loadDiagramId: Number | undefined;

  constructor(private renderer: Renderer2, private keyboardEventCallbackMap: KeyboardEventCallerService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        // @ts-ignore
        this.loadDiagramId = val.state.root.firstChild.params;
      }
    });

  }

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      console.log(event.key);
      let downButton = AppComponent.getDownButton(event);
      this.keyboardEventCallbackMap.executeCallbacks([event.key, "keydown", downButton], event);
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
    return axios.get('/me').then(response => this.userFullName = response.data)
  }

  public saveDiagramRemote(){
    return axios.post('/api/diagram/',{serializedDiagram:"diagram"}).then(response => this.userFullName = response.data)

  }

  public getUserDiagrams(){
    return axios.get('/api/diagram/all/me').then(response => this.userDiagrams = response.data)

  }



}
