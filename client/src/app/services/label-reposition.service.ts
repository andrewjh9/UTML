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
  private startPosition: Position | undefined = undefined;
  private label?: Label;

  constructor(private snapService: SnapService,
              private cachingService: CachingService) {
  }

  public activate(position: Position, label: Label) {
    this.startPosition = position;
    this.label = label;
  }

  public update(position: Position) {
    if (this.isActive()) {
      let diff = this.snapService.snapIfApplicable(Position.subtract(position, this.startPosition!));
      this.label!.position = Position.add(this.startPosition!, diff);
    } else {
      throw new Error('Service should be active!');
    }
  }

  public deactivate() {
    if (this.isActive()) {
      this.cachingService.save();
    }
    this.label = undefined;
    this.startPosition = undefined;
  }

  public isActive() {
    return this.startPosition !== undefined && this.label !== undefined;
  }
}
