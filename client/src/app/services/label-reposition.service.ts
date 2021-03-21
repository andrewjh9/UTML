import { Injectable } from '@angular/core';
import {SelectionService} from "./selection.service";
import {SnapService} from "./snap.service";
import {Label} from "../../model/label";
import {Position} from "../../model/position";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
export class LabelRepositionService {
  private selectedLabel: Label | undefined = undefined;
  private startPosition: Position | undefined = undefined;

  constructor(selectionService: SelectionService,
              private snapService: SnapService,
              private cachingService: CachingService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      if (selectedList.length === 1 && selectedList[0] instanceof Label) {
        this.selectedLabel = selectedList[0];
      } else {
        this.selectedLabel = undefined;
      }
    })
  }

  public activate(position: Position) {
    this.startPosition = position;
  }

  public update(position: Position) {
    if (this.isActive()) {
      let diff = this.snapService.snapIfApplicable(Position.subtract(position, this.startPosition!));
      this.selectedLabel!.position = Position.add(this.startPosition!, diff);
    } else {
      throw new Error('Service should be active!');
    }
  }

  public deactivate() {
    if (this.isActive()) {
      this.cachingService.save();
    }
    this.selectedLabel = undefined;
    this.startPosition = undefined;
  }

  public isActive() {
    return this.startPosition !== undefined && this.selectedLabel !== undefined;
  }
}
