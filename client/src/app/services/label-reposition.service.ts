import { Injectable } from '@angular/core';
import {SelectionService} from "./selection.service";
import {SnapService} from "./snap.service";
import {Label} from "../../model/edge/label";
import {Position} from "../../model/position";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
export class LabelRepositionService {
  private startMousePosition: Position | undefined = undefined;
  private startLabelPosition: Position | undefined = undefined;
  private label?: Label;

  constructor(private snapService: SnapService,
              private cachingService: CachingService) {
  }

  public activate(position: Position, label: Label) {
    this.startMousePosition = position;
    this.startLabelPosition = label.position;
    this.label = label;
  }

  public update(position: Position) {
    if (this.isActive()) {
      let diff = (Position.subtract(position, this.startMousePosition!));
      this.label!.position = this.snapService.snapIfApplicable(Position.add(this.startLabelPosition!, diff));
    } else {
      throw new Error('Service should be active!');
    }
  }

  public deactivate() {
    if (this.isActive()) {
      console.log('Label Repositioner')
      this.cachingService.save();
    }
    this.label = undefined;
    this.startMousePosition = undefined;
    this.startLabelPosition = undefined;
  }

  public isActive() {
    return this.startMousePosition !== undefined && this.label !== undefined && this.startLabelPosition !== undefined;
  }
}
