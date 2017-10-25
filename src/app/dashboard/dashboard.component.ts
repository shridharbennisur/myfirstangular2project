import { Component, OnInit, NgModule } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ServiceComponent } from '../service/service.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers : [LoginComponent]
}) 

export class DashboardComponent implements OnInit {
  router;
  _auth;
  user = {
    user_name:'user_name',
    user_image:'user_image',
    user_provider:'user_provider'
  }
  loginComponent;
  constructor(_router: Router, loginComponent : LoginComponent, _auth: AuthService) {
    this.router = _router;
    this._auth = _auth;
    this.loginComponent = loginComponent;
  }  


  ngOnInit() {
    if (this.loginComponent.getCookie('user_name') == '') {
      this.router.navigate('/login');
    }
    this.user.user_name = this.loginComponent.getCookie('user_name');
    this.user.user_image = this.loginComponent.getCookie('user_image');
    this.user.user_provider = this.loginComponent.getCookie('user_provider');
  }
    
    

  

  logout() {
    this.loginComponent.deleteCookie('email');
    this.loginComponent.deleteCookie('user_name');
    this.loginComponent.deleteCookie('user_image');
    this.loginComponent.deleteCookie('user_provider');
    this._auth.logout().subscribe(
            (data) => {
                console.log(data);
                this.router.navigate('/login');
            }
        )
    
    this.router.navigate('/login');

  }
   

}
