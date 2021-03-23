import {AfterViewInit, Component, Renderer2} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {DownButton, KeyboardEventCallerService} from "./services/keyboard-event-caller.service";
import {EditService} from "./services/edit.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private renderer: Renderer2,
              private keyboardEventCallbackMap: KeyboardEventCallerService,
              private editService: EditService) {
  }

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      if (event.key == "Backspace" && this.editService.isActive()) {
        event.preventDefault();
      }
      let downButton = AppComponent.getDownButton(event);
      if (this.editService.isActive()) {
        this.editService.handleKeyPressed(event.key);
      } else {
        this.keyboardEventCallbackMap.executeCallbacks([event.key, "keydown", downButton], event);
      }
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
