import { Component, OnInit, NgModule } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ServiceComponent } from '../service/service.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [LoginComponent]
}) 

export class DashboardComponent implements OnInit {
   router;
  loginComponent;
  constructor(_router: Router, loginComponent : LoginComponent) {
    this.router = _router;
    this.loginComponent = loginComponent;
  }  


  ngOnInit() {
  }

  logout() {
    this.loginComponent.deleteCookie('email');
    this.router.navigateByUrl('');

  }

}
