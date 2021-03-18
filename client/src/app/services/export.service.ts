import { Injectable } from '@angular/core';
import {Diagram} from "../../model/diagram";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {DiagramContainerService} from "./diagram-container.service";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private diagram: Diagram;
  private downloadJsonHref?: SafeUrl;

  public filename: string = 'yourDiagram';

  constructor(diagramContainer: DiagramContainerService) {
    this.diagram = diagramContainer.get();
    diagramContainer.diagramObservable.subscribe(diagram => this.diagram = diagram);
  }

  public exportAsPNG(): void {

    let svg :HTMLElement | null = document.getElementById('diagram');
    let canvas = document.querySelector('canvas');

    if(canvas != null && svg != null){
      let ctx = canvas.getContext('2d');
      let data = (new XMLSerializer()).serializeToString(svg);
      let DOMURL = window.URL || window.webkitURL || window;
      let img = new Image();
      img.width = 1200;
      img.height = 600 ;
      // @ts-ignore
      let svgSize = svg.viewBox.baseVal;
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;
      let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      let url = DOMURL.createObjectURL(svgBlob);
      img.onload = () => {
        if(ctx != null) {
          ctx.drawImage(img, 0, 0);
          DOMURL.revokeObjectURL(url);
          // @ts-ignore
          let imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

          this.triggerDownload(this.filename, imgURI, "png");
          document!.querySelector('canvas')!.remove();
        } else{
          new Error("The diagram has disappeared");
        }
      };
      img.src = url;
    } else{new Error("The diagram has disappeared") }
  }

  public exportAsJSON() {
    let theJSON = JSON.stringify(this.diagram?.serialise());
    let uri: string = "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON)
    this.triggerDownload(this.filename, uri, "utml")
  }

  private triggerDownload(name: string, uri: string, extension: string) {
    let nameAndExtension = name + "." + extension;
    let element = document.createElement('a');
    element.setAttribute('href', uri);
    element.setAttribute('download', nameAndExtension);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }


}
