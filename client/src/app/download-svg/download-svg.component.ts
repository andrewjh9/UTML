import { Component, OnInit } from '@angular/core';
import {DiagramContainerService} from "../services/diagram-container.service";
import {Diagram} from "../../model/diagram";

@Component({
  selector: 'download-svg',
  templateUrl: './download-svg.component.html',
  styleUrls: ['./download-svg.component.scss']
})
export class DownloadSvgComponent {
  private static readonly MARGIN = 5;

  diagram: Diagram;
  constructor(diagramContainerService: DiagramContainerService) {
    this.diagram = diagramContainerService.get();
    diagramContainerService.diagramObservable.subscribe(diagram => this.diagram = diagram);
  }

  public get width(): number {
    return this.diagram.getDimensions().width + 2 * DownloadSvgComponent.MARGIN;
  }

  public get height(): number {
    return this.diagram.getDimensions().height + 2 * DownloadSvgComponent.MARGIN;
  }

  public get viewBox(): string {
    let dimensions = this.diagram.getDimensions();
    return `${dimensions.leftX - DownloadSvgComponent.MARGIN} ${dimensions.topY - DownloadSvgComponent.MARGIN} ${this.width} ${this.height}`;
  }
}
