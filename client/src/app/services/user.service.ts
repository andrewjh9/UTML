import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _name?: string;
  private _diagramNames: Set<String>;
  private authenticated: boolean = false;
  public openDiagramName: String =  'yourDiagram';

  constructor() {
    this._diagramNames = new Set<String>();

  }

  public setOpenDiagramName(diagramName: String){
    this.openDiagramName = diagramName;
  }

  public setOpenDiagramNameDefault(){
    this.openDiagramName =  'yourDiagram';
  }


  get diagramNames(): Set<String> {
    return this._diagramNames;
  }

  public addDiagramNames(newDiagramName: String[]){
    for (let diagramName of  newDiagramName) {
      this._diagramNames.add(diagramName);
    }
  }

  public diagramNameExists(diagramName: String): boolean{
    return this._diagramNames.has(diagramName);
  }

  public clearDiagramNames(){
    this._diagramNames = new Set<String>();
  }

  setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  getAuthenticated(){
    return this.authenticated;
  }


  get name(): string | undefined {
    return this._name;
  }

  set name(value: string | undefined) {
    this._name = value;
  }
}
