import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Edge, ArrowStyle, EdgeStyle } from '../model/diagram';

@Component({
  selector: 'app-egde-canvas',
  templateUrl: './egde-canvas.component.html',
  styleUrls: ['./egde-canvas.component.scss']
})
export class EgdeCanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement> | null;
  context?: CanvasRenderingContext2D | null;
  @Input() public edges?: Edge[];
  constructor() {
    // this.edges = [this.edge];
  }

  ngAfterViewInit(): any {
    console.log(this.canvas);
    this.context = this.canvas?.nativeElement.getContext(`2d`);
    if (!this.context || !this.edges) {
      // todo: error handling
      return;
    }

    // this.edges.forEach( (edge: Edge, index: number) => {
    //   this.context?.beginPath();
    //   this.context?.moveTo(edge.startPosition.x, edge.startPosition.y);
    //   this.context?.lineTo(edge.endPosition.x, edge.endPosition.y);
    //   this.context?.stroke();
    // });
  }
}
