import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorLauncherService} from "../services/error-launcher.service";

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  errorMessage!: string;
  get alertClass() {
    return this.errorLauncherService.type === 'error' ? 'alert-danger' : 'alert-warning';
  }
  get title() {
    return this.errorLauncherService.type === 'error' ? 'Error' : 'Warning';
  }

  constructor(public modal: NgbActiveModal, private errorLauncherService: ErrorLauncherService) { }

  ngOnInit(): void {
    this.errorMessage = this.errorLauncherService.errorMessage;
  }
}
