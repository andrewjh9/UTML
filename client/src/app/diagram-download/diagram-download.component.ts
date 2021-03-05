import {Component, Input, OnInit} from '@angular/core';
import {Diagram} from "../../model/diagram";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-diagram-download',
  templateUrl: './diagram-download.component.html',
  styleUrls: ['./diagram-download.component.scss']
})
export class DiagramDownloadComponent {
  @Input() diagram?: Diagram;
  downloadJsonHref?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  generateDownloadJsonUri() {
    if (this.diagram) {
      let theJSON = JSON.stringify(this.diagram?.serialise());
      let uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    }
  }
}
