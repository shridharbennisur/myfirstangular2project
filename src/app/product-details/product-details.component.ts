import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ServiceComponent],
})
export class ProductDetailsComponent implements OnInit {
  expression = 'name';
  reverse = false;
  modalTitle;
  modalAction;
  editProductName;
  newProduct: any = [];
  error = false;
  serviceComponent: ServiceComponent;
  products: any = [];

  ngOnInit() {
    this.getProduct();
  }

  constructor(service: ServiceComponent) {
    this.serviceComponent = service;
  }


/**
 * function to get all products from database
 */
  getProduct() {
    this.serviceComponent.getProduct().subscribe(res => {
      let response = JSON.parse(res._body);
      for (let i = 0; i < response.length; i++) {

        this.products.push({
          'id': response[i].id,
          'name': response[i].name,
          'price': response[i].price,
          'quantity': response[i].quantity
        })
      }
    }), error => alert(error);
  }

  sortByType(type) {

    if (type.indexOf('-') == -1) {
      this.expression = type;
      this.reverse = true;
    } else {
      this.expression = type.replace('-', '');
      this.reverse = false;
    }
    console.log(this.expression);
    console.log(this.reverse);
  }

/**
 * function to add products to database
 * @param newproduct object
 */
  addNewProduct(newproduct) {
    let newName = newproduct.newProductName || undefined;
    let newPrice = newproduct.newProductPrice || undefined;
    let newQuantity = newproduct.newProductQuantity || undefined;
    if (newName === undefined || newPrice === undefined || newQuantity === undefined) {
      this.error = true;
    } else {
      this.serviceComponent.saveProduct(newproduct).subscribe(res => {
        if (res[0].status == 1) {
          document.location.reload();
        } else if (res[0].status == 0) {
          console.log('Not saved some thing happen!');
        }
      }), error => alert(error);
      $('#save').addClass("close");
      $('#save').attr("data-dismiss", "modal");
    }
  }

/**
 * function to get product by productid
 * @param productId
 */
  getProductById(productId) {
    this.serviceComponent.getProductByProductId(productId).subscribe(res => {
      let response = JSON.parse(res._body);
      this.newProduct.id = response[0].id;
      this.newProduct.newProductName = response[0].name;
      this.newProduct.newProductPrice = response[0].price;
      this.newProduct.newProductQuantity = response[0].quantity;
    }), error => alert(error);
  }

/**
 * function to update the product 
 */
  updateProduct(newproduct) {
    let newName = newproduct.newProductName || undefined;
    let newPrice = newproduct.newProductPrice || undefined;
    let newQuantity = newproduct.newProductQuantity || undefined;
    if (newName === undefined || newPrice === undefined || newQuantity === undefined) {
      this.error = true;
    } else {
      this.serviceComponent.updateProduct(newproduct).subscribe(res => {
        if (res[0].status == 1) {
          document.location.reload();
        } else {
          console.log(res[0].response);
        }
      }), error => alert(error);
      $('#edit').addClass("close");
      $('#edit').attr("data-dismiss", "modal");
    }
  }

/**
 * function to dalete product 
 */
  deleteProduct(productId) {
    this.serviceComponent.deleteProduct(productId).subscribe(res => {
       let response = JSON.parse(res._body);
       if (response[0].status == 1) {
          document.location.reload();
        } else {
          console.log(response[0].response);
        }  
    }), error => alert(error);    
  }

/**
 * function to show modal 
 */
  showModal(modalname) {
    this.error = false;
    if (modalname == 'save') {
      this.newProduct = [];
      this.modalTitle = 'Add New Product';
      this.modalAction = 'Save';
    } else {
      this.modalTitle = 'Update Product';
      this.modalAction = 'Edit';
    }
    $('#' + modalname).removeClass('close');
    $('#' + modalname).removeAttr('data-dismiss');
  }  

  /**
   * function to inline edit
   */
  inlineEdit(productId,productProperty, productValue, tdTagId) {
    console.log(productId+" "+productProperty+" "+productValue);
    $('#'+tdTagId).html('<textarea>' + productValue + '</textarea>');   
  }

  

}


//bucket name = elasticbeanstalk-ap-south-1-733967857697
//bucket area = Asia Pacific (Mumbai)
//App ID: 170831426820416


//firbase id firstproject-ff285

