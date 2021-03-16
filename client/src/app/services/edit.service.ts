import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private isInEditMode?: boolean;
  private node?: Node;
  private renderer: Renderer2;
  private activeIndex?: number;
  constructor(private keyboardEventCallerService: KeyboardEventCallerService,
              rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      if (this.isActive()) {
        this.update(this.activeIndex!, event.key)
      }
    });
  }

  public activate(node: Node) {
    this.node = node;
    this.isInEditMode = true;
  }

  public setActive(index: number) {
    console.log(index);
    console.log(this.activeIndex)
    if (this.activeIndex != index){
      this.removeBar(this.activeIndex);
      this.activeIndex = index;
      let currentText: string[] = this.node!.getTextLines();
      currentText[index] += "|";
      this.setTextToNode(currentText);
    }
  }

  public isActive(): boolean {
    return this.isInEditMode!;
  }

  public addField(): void{
    if (this.isActive()) {
      let currentText: string[] = this.node!.getTextLines();
      let newFieldDefaultText = "New field";
      currentText.push(newFieldDefaultText);
     this.setTextToNode(currentText)
    }
  }

  public update(index: number, text: string): void {
    if (this.isActive()) {
      let currentText: string[] = this.node!.getTextLines();
      if (text.length == 1 && text != "|") {
        currentText[index] = currentText[index].split("|")[0] + text + "|"
          +currentText[index].split("|")[1];
      } else if (text == "Backspace") {
        currentText[index] = currentText[index].split("|")[0].slice(0,-1) +
          "|" + currentText[index].split("|")[1];
      } else if (text == "ArrowLeft") {
        let arr: string[] = currentText[index].split("|");
        currentText[index] = this.swapFirstAndLastAndAppend(arr[0], "|" + arr[1])
      } else if (text == "ArrowRight") {
        let arr: string[] = currentText[index].split("|");
        currentText[index] = this.swapFirstAndLastAndAppend(arr[0] + "|", arr[1])
      }
      this.setTextToNode(currentText);
      if (text == "ArrowUp") {
        if (this.activeIndex! > 0) {
          this.setActive(this.activeIndex! - 1);
        }
      } else if (text == "ArrowDown") {
        if (this.activeIndex! < this.node!.getTextLines().length - 1) {
          this.setActive(this.activeIndex! + 1);
        }
      }
    }
  }

  private swapFirstAndLastAndAppend(string1: string, string2: string): string {
    let lastOfFirst = string1[string1.length - 1];
    let firstOfLast = string2[0];
    string1 = string1.slice(0,-1) + firstOfLast;
    string2 = lastOfFirst + string2.substring(1);
    return string1 + string2;
  }

  private setTextToNode(currentText: string[]): void {
    let textContent = "";
    for (let i = 0; i < currentText.length - 1; i++) {
      textContent += currentText[i] + "\\n"
    }
    textContent += currentText[currentText.length - 1];
    this.node!.text = textContent;
  }

  private removeBar(index: number | undefined): void {
    if (index !== undefined) {
      let currentText = this.node!.getTextLines();
      currentText[index] = currentText[index].slice(0, -1);
      this.setTextToNode(currentText);
    }
  }

  public deactivate(): void {
    this.node = undefined;
    this.isInEditMode = false;
  }
}
