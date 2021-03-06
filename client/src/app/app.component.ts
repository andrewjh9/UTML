import {AfterViewInit, Component, Renderer2} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DownButton, KeyboardEventCallerService} from "./services/keyboard-event-caller.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private keyboardEventCallbackMap: KeyboardEventCallerService) {
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
}
