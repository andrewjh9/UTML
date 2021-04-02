import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {
  public static readonly LOCAL_STORAGE_KEY = 'showHelpOnStart';

  // Todo: hook this up to cookies
  openOnStart: boolean = true;
  active: any = 1;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
    let value = localStorage.getItem(HelpModalComponent.LOCAL_STORAGE_KEY);
    this.openOnStart = value === null || value === 'true';
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem(HelpModalComponent.LOCAL_STORAGE_KEY, this.openOnStart.toString());
  }
}
