import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  diagrams?: string;

  constructor(private httpClient: HttpClient) {
    // this.diagrams = `hello`;
    const h: HttpHeaders = (new HttpHeaders()).set(`Access-Control-Allow-Origin`, `*`);
    this.httpClient.get(`http://localhost:8080/api/diagram`, {headers: h}).subscribe((data: any) => {
      this.diagrams = JSON.stringify(data);
      console.log(data);
    });
  }
}
