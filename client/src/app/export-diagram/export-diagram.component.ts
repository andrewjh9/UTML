import { Component, OnInit } from '@angular/core';

const EXPORT_FILE_NAME = 'image_download';

@Component({
  selector: 'app-export-diagram',
  templateUrl: './export-diagram.component.html',
  styleUrls: ['./export-diagram.component.scss']
})
/**
 * TODO Refactor, When interface is ready for button to be placed well.
 */
export class ExportDiagramComponent implements OnInit {

  constructor() { }

  ngOnInit()  : void {
  }

  export() {

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

            this.triggerDownload(imgURI);
          } else{
              new Error("The diagram has disappeared");
          }
        };
        img.src = url;
    } else{new Error("The diagram has disappeared") }
  }
  triggerDownload (imgURI: any) {
    let evt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });

    let a = document.createElement('a');
    a.setAttribute('download', EXPORT_FILE_NAME + '.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');
    a.dispatchEvent(evt);
   // @ts-ignore
    document.querySelector('canvas').remove();

  }


}
