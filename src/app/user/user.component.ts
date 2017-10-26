import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ServiceComponent, LoginComponent]
})

export class UserComponent implements OnInit {
  serviceComponent: ServiceComponent;
  title = 'map';
  lat: number;
  long: number;
  loginComponent;
  user = {
    user_name: 'user_name',
    user_image: 'user_image',
    user_provider: 'user_provider'
  }
  constructor(service: ServiceComponent, loginComponent: LoginComponent) {
    this.serviceComponent = service;
    this.loginComponent = loginComponent;
  }

  ngOnInit() {
    this.user.user_name = this.loginComponent.getCookie('user_name');
    this.user.user_image = this.loginComponent.getCookie('user_image');
    this.user.user_provider = this.loginComponent.getCookie('user_provider');
  }

  getlocation() {
    this.serviceComponent.getUserLocation().subscribe(res => {
      let response = JSON.parse(res._body);
      this.lat = response.lat;
      this.long = response.lon;
      console.log(response);
      console.log(this.lat + "D" + this.long);
    }), error => alert(error);
  }



}

//AIzaSyAsKAnRaTWwVWsrlHLixXWvMKg70sE-V-E