import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Diagram} from "../model/diagram";

@Pipe({
  name: 'jsonUri',
  pure: false
})
export class JsonUriPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(diagram: Diagram): SafeUrl {
    let theJSON = JSON.stringify(diagram.serialise());
    return this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
  }

}
