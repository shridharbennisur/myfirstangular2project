import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';


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
  busy;

  ngOnInit() {
   this.busy =  this.getProduct();
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
    if (type == 'price') {
      this.products.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (type == '-price') {
      this.products.sort(function (a, b) {
        return b.price - a.price;
      });
    }
    if (type == 'quantity') {
      this.products.sort(function (a, b) {
        return a.quantity - b.quantity;
      });
    }
    if (type == '-quantity') {
      this.products.sort(function (a, b) {
        return b.quantity - a.quantity;
      });
    }
    if (type == 'name') {
      this.products.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    }
    if (type == '-name') {
      this.products.sort(function (a, b) {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      });
    }
    // if (type.indexOf('-') == -1) {
    //   this.expression = type;
    //   this.reverse = true;
    // } else {
    //   this.expression = type.replace('-', '');
    //   this.reverse = false;
    // }
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
          this.serviceComponent.postLog('success: new product added succesfully').subscribe(res=>console.log(res),err => console.log(err));
          this.products = [];
          this.getProduct();
        } else if (res[0].status == 0) {
          console.log('Not saved some thing happen!');
          this.serviceComponent.postLog(res[0].response).subscribe(res=>console.log(res),err => console.log(err));
        }
      }), error => { this.serviceComponent.postLog(error).subscribe(res=>console.log(res),err => console.log(err)); };
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
    }), error => {
      this.serviceComponent.postLog('Error: could not get product').subscribe(res=>console.log(res),err => console.log(err));
      alert(error)};
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
          this.serviceComponent.postLog('success:product details updated successfully').subscribe(res=>console.log(res),err => console.log(err));
          this.products = [];
          this.getProduct();
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
        this.serviceComponent.postLog('success:product details deleted successfully').subscribe(res=>console.log(res),err => console.log(err));
        this.products = [];
        this.getProduct();
      } else {
        this.serviceComponent.postLog(response[0].response).subscribe(res=>console.log(res),err => console.log(err));
      }
    }), error => this.serviceComponent.postLog(error).subscribe(res=>console.log(res),err => console.log(err));
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
  inlineEdit(productId, event, productProperty) {
    if (event.target.outerText == null || event.target.outerText == '') {
      this.error = true;
      console.log('dont give null value');
    } else {
      this.error = false;
      this.serviceComponent.updateProductByProperty(event.target.outerText,productId, productProperty).subscribe(res => {
        if (res[0].status == 1) {
          //document.location.reload();
        } else {
          console.log(res[0].response);
        }
      }), error => alert(error);;
    }
  }

download() {

var options = { 
fieldSeparator: ',',
quoteStrings: '"',
decimalseparator: '.',
showLabels: true, 
showTitle: true 
};
this.serviceComponent.postLog('success:csv file is downloaded').subscribe(res=>console.log(res),err => console.log(err));
new Angular2Csv(this.products, 'All product details',options);
//new Angular2Csv(dummyData, 'My Report',options);
} 




}


//bucket name = elasticbeanstalk-ap-south-1-733967857697
//bucket area = Asia Pacific (Mumbai)
//App ID: 170831426820416


//firbase id firstproject-ff285

