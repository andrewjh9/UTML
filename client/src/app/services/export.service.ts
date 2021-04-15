import { Injectable } from '@angular/core';
import {Diagram} from "../../model/diagram";
import {DiagramContainerService} from "./diagram-container.service";
import {SelectionService} from "./selection.service";
import {ZoomService} from "./zoom.service";
import {SettingsContainerService} from "./settings-container.service";
import {Node} from "../../model/node/node";
import {EndStyle} from "../../model/edge";
import {HttpClient} from "@angular/common/http";

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
              private httpClient: HttpClient) {
    this.diagram = diagramContainer.get();
    diagramContainer.diagramObservable.subscribe(diagram => this.diagram = diagram);
  }

  public exportAsPNG(fileName: string): void {
    this.filename = fileName;
    let oldGridValue = this.settingsContainerService.grid.getValue();
    this.settingsContainerService.grid.next(false);
    this.zoomService.reset();
    // It takes a bit of time for the zoom to actually change the svg due to change detection.
    // Therefore we wait 100ms before exporting.
    setTimeout(() => {
      let svg :HTMLElement | null = document.getElementById('diagram');
      let canvas = document.querySelector('canvas');

      if(canvas != null && svg != null){
        let ctx = canvas.getContext('2d');
        let data = (new XMLSerializer()).serializeToString(svg);
        let DOMURL = window.URL || window.webkitURL || window;
        let img = new Image();

        const MARGIN = 5;

        const width = this.diagram.getDimensions().width + (MARGIN * 2);
        const height = this.diagram.getDimensions().height + (MARGIN * 2);


        img.width = width;
        img.height = height;
        canvas.width = width;
        canvas.height = height;

        let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
        let url = DOMURL.createObjectURL(svgBlob);
        img.onload = () => {
          if(ctx != null) {
            ctx.drawImage(img, -(this.diagram.getDimensions().leftX - MARGIN), -(this.diagram.getDimensions().topY - MARGIN));
            DOMURL.revokeObjectURL(url);
            // @ts-ignore
            let imgURI = canvas
              .toDataURL('image/png')
              .replace('image/png', 'image/octet-stream');

            this.triggerDownload(this.filename, imgURI, "png");
            // document!.querySelector('canvas')!.remove();
          } else {
            new Error("The diagram has disappeared");
          }
        };
        img.src = url;
      } else {
        throw new Error("The diagram has disappeared")
      }
      this.settingsContainerService.grid.next(oldGridValue);
    }, 100);
  }

  public exportAsJSON(filename: string) {
    let theJSON = JSON.stringify(this.diagram?.serialise());
    let uri: string = "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON)
    this.triggerDownload(filename, uri, "utml")
  }

  public getDiagramJSON(fileName: String){
    return {serialisedDiagram: JSON.stringify(this.diagram?.serialise()), title: fileName};
  }

  public exportDFA(): void {
    try {
      let alphabet: Array<string> = [];

      this.diagram.edges.forEach(edge => {
        if (edge.middleLabel) {
          let symbol = edge.middleLabel!.value;
          if (!alphabet.includes(symbol)) {
            alphabet.push(symbol);
          }
        }
      });

      let result: any = {
        'alphabet': alphabet,
        'states': [],
        'transitions': [],
        'accepting_states': [],
      };

      for (let node of this.diagram.nodes) {
        result['states'].push(node.text);

        if (node.hasDoubleBorder) {
          result['accepting_states'].push(node.text);
        }
      }

      for (let edge of this.diagram.edges) {
        function addTransition(start: Node, end: Node, s: string): void {
          result.transitions.push([start.text, s, end.text])
        }

        if (edge.startNode !== undefined && edge.endNode !== undefined) {
          for (let symbol of edge.middleLabel!.value.split(',')) {
            if (edge.startStyle === EndStyle.None) {
              addTransition(edge.startNode!, edge.endNode!, symbol.trim())
            } else {
              addTransition(edge.endNode!, edge.startNode!, symbol.trim());
            }
          }
        } else if (edge.startNode === undefined && edge.endNode !== undefined) {
          result['initial_state'] = edge.endNode!.text;
        }
      }

      let theJSON = JSON.stringify(result);
      let uri: string = "data:text/json;charset=UTF-8," + encodeURIComponent(theJSON)
      this.triggerDownload('dfa', uri, "json")
      //
      // this.httpClient.post('http://localhost:5000', {
      //   'word': 'a',
      //   'diagram': JSON.stringify(result)
      // }).subscribe(
      //   data => console.log(data),
      //   error => console.log(error)
      // );


    } catch (e) {
      console.error(e);
      alert('could not create dfa.json')
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
