import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { ProductDetailsComponent} from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path:'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path:'', redirectTo:'product-details', pathMatch: 'full'},
    { path: 'product-details', component: ProductDetailsComponent  },
    { path: 'product', component: ProductComponent, },
    { path: 'service', component: ServiceComponent, }
  ]}
];



