import {Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ServiceComponent]
}) 

export class UserComponent implements OnInit {
  serviceComponent: ServiceComponent;
  title = 'map';
  lat: number;
  long: number;
  constructor(service: ServiceComponent) {
    this.serviceComponent = service;
  }

  ngOnInit() {
  }

  getlocation() {
    this.serviceComponent. getUserLocation().subscribe(res => {
      let response = JSON.parse(res._body);
      this.lat = response.lat;
      this.long = response.lon;
      console.log(response);
      console.log(this.lat+"D"+this.long);
    }), error => alert(error);
  }

  

}

//AIzaSyAsKAnRaTWwVWsrlHLixXWvMKg70sE-V-E