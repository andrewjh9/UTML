import {EditService} from "../services/edit.service";
import {Node} from "../../model/node/node";

export abstract class AbstractTextNode {
  private inEditMode: boolean = false;
  abstract node: Node;

  protected constructor(protected editService: EditService) {
  }

  subscribeToEditService(): void {
    this.editService.editElementObservable.subscribe(element => this.inEditMode = element === this.node);
  }

  public get textLines() {
    return (this.inEditMode ? this.editService.includeCursor(this.node.text) : this.node.text).split('\\n');
  }
}
