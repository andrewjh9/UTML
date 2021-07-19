import { Injectable } from '@angular/core';
import {Diagram} from "../../model/diagram";
import {DiagramContainerService} from "./diagram-container.service";
import {SelectionService} from "./selection.service";
import {ZoomService} from "./zoom.service";
import {SettingsContainerService} from "./settings-container.service";
import {Node} from "../../model/node/node";
import {EndStyle} from "../../model/edge";
import {HttpClient} from "@angular/common/http";
import {ErrorLauncherService} from "./error-launcher.service";

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private diagram: Diagram;
  private filename: string = "yourDiagram";

  constructor(diagramContainer: DiagramContainerService,
              private selectionService: SelectionService,
              private zoomService: ZoomService,
              private settingsContainerService: SettingsContainerService,
              private httpClient: HttpClient,
              private errorLauncherService: ErrorLauncherService) {
    this.diagram = diagramContainer.get();
    diagramContainer.diagramObservable.subscribe(diagram => this.diagram = diagram);
  }

  public exportAsPNG(fileName: string): void {
    // To export an image to a png, we must take the following steps:
    // 1) We must select the SVG and serialise to XML
    // 2) We then create a blob based upon this XML
    // 3) We then create a ObjectURL from this blob
    // 4) We then create an Image object and set the src of this image to our created ObjectURL
    // 5) Then we draw this Image on a canvas when it is loaded through a onload callback
    // 6) Finally this canvas is converted to a DataURL which we can finally download.

    // The SVG from which the export png is created, is not the SVG the user interacts with.
    // It is a special svg created by the download-svg.component.ts component.
    // This is done because the SVG the user interacts with, has many services involved that alter its viewbox properties.
    // For the exportation process, we want this control and therefore we have a different SVG object entirely instead of
    // trying to manage this control across a variety of services.

    // The SVG as it would be rendered is exported to the PNG. To get the correct dimensions, we alter the
    // width, height and viewbox of the download-svg component to wrap the drawn elements


    this.filename = fileName;

    const MARGIN = 5;
    const exportWidth = this.diagram.getDimensions().width + (MARGIN * 2);
    const exportHeight = this.diagram.getDimensions().height + (MARGIN * 2);

    // console.info(this.diagram.getDimensions());
    // console.info(`exportWidth=${exportWidth} - exportHeight=${exportHeight}`);

    let svg: HTMLElement | null = document.getElementById('downloadSVG');
    let canvas = document.querySelector('canvas');

    if (canvas != null && svg != null) {
      let ctx = canvas.getContext('2d');
      let data = (new XMLSerializer()).serializeToString(svg);
      let DOMURL = window.URL || window.webkitURL || window;
      let img = new Image();

      canvas.width = exportWidth;
      canvas.height = exportHeight;

      let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      let url = DOMURL.createObjectURL(svgBlob);

      img.onload = () => {
        if(ctx != null) {
          ctx.drawImage(
            img,
            0, // sx
            0, // sy
            exportWidth, // sw
            exportHeight, // sh
            0, // dx
            0, // dy
            exportWidth, // dw
            exportHeight // dh
          );
          DOMURL.revokeObjectURL(url);

          let imgURI = canvas!
            .toDataURL('image/png', 1)
            .replace('image/png', 'image/octet-stream');

          this.triggerDownload(this.filename, imgURI, "png");
        } else {
          console.error("The diagram has disappeared. (1)");
          this.errorLauncherService.launch('Something went wrong whilst exporting your image.');
        }
      };
      img.src = url;
    } else {
      console.error("The diagram has disappeared. (2)")
      this.errorLauncherService.launch('Something went wrong whilst exporting your image.');
    }
  }

  public exportAsJSON(filename: string) {
    let theJSON = JSON.stringify(this.diagram?.serialise());
    let uri: string = "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON);
    this.triggerDownload(filename, uri, "utml");
  }

  public getDiagramJSON(fileName: String){
    return {
      serialisedDiagram: JSON.stringify(this.diagram?.serialise()),
      title: fileName
    };
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
