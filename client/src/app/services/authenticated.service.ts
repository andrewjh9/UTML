import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Diagram} from "../../model/diagram";
import {fsm} from "../../model/examples/fsm";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  private authenticated: boolean = false;
  private userFullName: string = "";

  setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  getAuthenticated(){
    return this.authenticated;
  }

  setUserFullName(userFullName: string) {
    this.userFullName  = userFullName;
  }

  getUserFullName(){
    if(this.authenticated){
      return this.userFullName;
    } else {
      return "";
    }
  }

}
