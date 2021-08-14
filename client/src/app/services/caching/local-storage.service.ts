import { Injectable } from '@angular/core';
import {DiagramContainerService} from "../diagram-container.service";
import {Diagram} from "../../../model/diagram";
import {deserialiseDiagram} from "../../../serialisation/deserialise/deserialise-diagram";
import {ChangeDetectionService} from "./change-detection.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private currentID?: number;
  public static readonly CACHE_PREFIX = 'diagram-cache-'

  private get currentKey() {
    return LocalStorageService.CACHE_PREFIX + this.currentID!;
  }

  constructor(private diagramContainer: DiagramContainerService,
              changeDetectionService: ChangeDetectionService) {
    changeDetectionService.addCallback(() => this.save());
  }
  // This setup must happen after the DOM is created. Therefore this logic can not be in the constructor.
  // Setup is now called in ngAfterInit of the diagram component.
  public setup() {
    let allKeys = this.getAllDiagramKeys();
    let allIDs = allKeys.map(key => parseInt(key.substr(LocalStorageService.CACHE_PREFIX.length)));

    let currentHighest = 0;
    for (let id of allIDs) {
      if (id > currentHighest) {
        currentHighest = id;
      }
    }

    this.currentID = currentHighest + 1;
  }



  public getAllDiagramKeys(): string[] {
    let result = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i) as string;
      if (key.startsWith(LocalStorageService.CACHE_PREFIX)) {
        result.push(key);
      }
    }
    return result;
  }

  public getKeyDiagramPairs(): Array<[string, Diagram]> {
    let result: Array<[string, Diagram]> = [];

    for (let key of this.getAllDiagramKeys()) {
      try {
        result.push([key, deserialiseDiagram(JSON.parse(localStorage.getItem(key)!))])
      } catch (ignored) {}
    }

    return result;
  }

  public removeKey(key: string) {
    localStorage.removeItem(key);
  }

  public save(): void {
    if (this.currentID !== undefined) {
      localStorage.setItem(this.currentKey, JSON.stringify(this.diagramContainer.get().serialise()));
    }
  }

  public clear(): void {
    this.getKeyDiagramPairs().forEach(([key, _]) => {
      localStorage.removeItem(key);
    });
  }
}
