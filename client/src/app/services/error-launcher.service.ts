import { Injectable } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ErrorLauncherService {
  private static readonly DEFAULT_ERROR_MESSAGE = 'An error has occurred.'
  private _errorMessage: string = ErrorLauncherService.DEFAULT_ERROR_MESSAGE;
  private _type: 'warning' | 'error' = 'error'

  constructor(private modalService: NgbModal) { }

  public launch(errorMessage: string = ErrorLauncherService.DEFAULT_ERROR_MESSAGE,
                type: 'warning' | 'error' = 'error') {
    this._errorMessage = errorMessage;
    this._type = type;
    this.modalService.open(ErrorModalComponent);
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get type(): 'warning' | 'error' {
    return this._type;
  }
}
