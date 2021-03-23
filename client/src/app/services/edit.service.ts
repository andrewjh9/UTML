import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {Label} from "../../model/label";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private isInEditMode: boolean = false;
  private editable?: Node | Label;
  private activeLineIndex?: number;
  constructor(private cachingService: CachingService) {

  }

  public activate(editable: Node | Label, index: number) {
    this.editable = editable;
    this.isInEditMode = true;
    this.activeLineIndex = index;
  }

  public isActive() {
    return this.isInEditMode;
  }

  public handleKeyPressed(key: string) {
    if (this.isActive() && key.length == 1) {
      this.handleCharacters(key);
    } else if (this.isActive()) {
      this.handleCommands(key);
    }
  }

  private handleCharacters(key: string) {
    let currentText: string[] = this.editable!.getTextLines();
    currentText[this.activeLineIndex!] += key;
    this.pushNewText(currentText);
  }

  private handleCommands(key: string) {
    let currentText: string[] = this.editable!.getTextLines();
    if (key == "Backspace") {
      currentText[this.activeLineIndex!] = currentText[this.activeLineIndex!].slice(0, -1);
    } else if (key == "Delete") {
      if (this.activeLineIndex! > 0) {
        currentText.splice(this.activeLineIndex!, 1);
        this.activeLineIndex! -= 1;
      }
    }
    this.pushNewText(currentText);
    if (key == "Escape") {
      this.deactivate();
    }
  }

  private pushNewText(text: string[]) {
    let textContent = "";
    for (let i = 0; i < text.length - 1; i++) {
      textContent += text[i] + "\\n"
    }
    textContent += text[text.length - 1];
    if (this.editable instanceof Node) {
      this.editable.text = textContent;
    } else if (this.editable instanceof Label) {
      this.editable.value = textContent;
    }
  }

  public deactivate() {
    this.cachingService.save();
    this.editable = undefined;
    this.isInEditMode = false;
    this.activeLineIndex = undefined;
  }

  public getEditable() {
    return this.editable;
  }

  public addField(): void {
    if (this.isActive()) {
      let currentText: string[] = this.editable!.getTextLines();
      let newFieldDefaultText = "New field";
      currentText.push(newFieldDefaultText);
      this.pushNewText(currentText);
      this.activeLineIndex = currentText.length - 1;
    }
  }

  public setNewLineActive(index: number) {
    this.activeLineIndex = index;
  }

  public getActiveLineIndex() {
    return this.activeLineIndex;
  }
}
