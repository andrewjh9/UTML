import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorModalComponent} from "./error-modal/error-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ErrorLauncherService {
  private static readonly DEFAULT_ERROR_MESSAGE = 'An error has occured.'
  private _errorMessage: string = ErrorLauncherService.DEFAULT_ERROR_MESSAGE;

  constructor(private modalService: NgbModal) { }

  public launch(errorMessage: string = ErrorLauncherService.DEFAULT_ERROR_MESSAGE) {
    this._errorMessage = errorMessage;
    this.modalService.open(ErrorModalComponent);
  }

  get errorMessage(): string {
    return this._errorMessage;
  }
}
