import { Injectable } from '@angular/core';
import {Diagram} from "../../model/diagram";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private diagram?: Diagram;
  constructor() { }

  public setDiagram(diagram: Diagram): void {
    this.diagram = diagram;
  }

  public exportAsPNG(): void {
    let svg :HTMLElement | null = document.getElementById('diagram');
    let canvas = document.querySelector('canvas');

    if(canvas != null && svg != null){
      let ctx = canvas.getContext('2d');
      let data = (new XMLSerializer()).serializeToString(svg);
      let DOMURL = window.URL || window.webkitURL || window;
      let img = new Image();
      img.width = 1200 * 2;
      img.height = 800 * 2;
      // @ts-ignore
      let svgSize = svg.viewBox.baseVal;
      canvas.width = svgSize.width * 2;
      canvas.height = svgSize.height * 2;
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

          this.triggerDownload("your-diagram-picture", imgURI, "png");
          document!.querySelector('canvas')!.remove();
        } else{
          new Error("The diagram has disappeared");
        }
      };
      img.src = url;
    } else{new Error("The diagram has disappeared") }
  }

  public exportAsJSON() {
    if (this.diagram) {
      let theJSON = JSON.stringify(this.diagram?.serialise());
      let uri: string = "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON)
      this.triggerDownload("your-diagram-serialised", uri, "json")
    }
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
