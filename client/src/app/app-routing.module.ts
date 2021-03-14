import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {UserComponent} from "./user/user.component"
import {DiagramComponent} from "./diagram/diagram.component";
const routes: Routes = [
  { path: '', component: DiagramComponent },
  { path: 'user', component: UserComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
