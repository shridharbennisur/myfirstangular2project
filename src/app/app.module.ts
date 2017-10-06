import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { appRoutes } from './app-routing.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { BsModalModule }  from 'ng2-bs3-modal';
import { Angular2SocialLoginModule } from "angular2-social-login";
import * as $ from 'jquery';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

let providers = {
    "facebook": {
      "clientId": "170831426820416",
      "apiVersion": "v2.8" //like v2.4 
    }
  };

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ServiceComponent,
    LoginComponent,
    DashboardComponent,
    ProductDetailsComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes),Ng2OrderModule,NgbModule.forRoot(),BsModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
