import { Component, OnInit } from '@angular/core';
import {SnapService} from "../services/snap.service";

@Component({
  selector: 'app-move-menu',
  templateUrl: './move-menu.component.html',
  styleUrls: ['./move-menu.component.scss']
})
export class MoveMenuComponent implements OnInit {

  constructor(private snapService: SnapService) { }

  public activate(){
    this.snapService.setSnapState(!this.snapService.isActive())
  }

  ngOnInit(): void {
  }

}
