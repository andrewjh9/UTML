import { Injectable } from '@angular/core';
import {Node} from "../../model/node/node";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private isInEditMode?: boolean;
  private node?: Node;
  constructor() { }

  public activate(node: Node) {
    this.node = node;
    this.isInEditMode = true;
  }

  public getText(index: number) {

  }

  public isActive(): boolean {
    return this.isInEditMode!;
  }

  public addField(): void{
    if (this.isActive()) {
      let currentText: string[] = this.node!.getTextLines();
      let newFieldDefaultText = "New field";
      currentText.push(newFieldDefaultText);
      let textContent = "";
      for (let i = 0; i < currentText.length - 1; i++) {
        textContent += currentText[i] + "\\n"
      }
      textContent += currentText[currentText.length - 1];
      this.node!.text = textContent;
    }

  }

  public update(index: number, text: string): void {
    if (this.isActive()) {
      let currentText: string[] = this.node!.getTextLines();
      currentText[index] = text;
      let textContent = "";
      for (let i = 0; i < currentText.length - 1; i++) {
        textContent += currentText[i] + "\\n"
      }
      textContent += currentText[currentText.length - 1];
      this.node!.text = textContent;
    }
  }

  public deactivate(): void {
    this.node = undefined;
    this.isInEditMode = false;
  }
}
