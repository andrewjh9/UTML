import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ErrorLauncherService} from "../error-launcher.service";

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  errorMessage!: string;
  constructor(public modal: NgbActiveModal, private errorLauncherService: ErrorLauncherService) { }

  ngOnInit(): void {
    this.errorMessage = this.errorLauncherService.errorMessage;
  }
}
