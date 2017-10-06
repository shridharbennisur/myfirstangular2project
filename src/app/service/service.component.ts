import { Component, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html'
})
@Injectable()
export class ServiceComponent {
    http;
    headers;
    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/x-www-form-urlencoded");
        this.headers.append('Content-Type', 'application/json');
    }

    saveProduct(newProduct) {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post('http://localhost:8000/api/addproduct.php', {
            name: newProduct.newProductName,
            price: newProduct.newProductPrice,
            quantity: newProduct.newProductQuantity
        }, options).map((response) => {
            return response.json();
        });
    }

    getProduct() {
         let options = new RequestOptions({ headers: this.headers });
        return this.http.get('http://localhost:8000/api/getproduct.php',options).map((response) => {
            return response;
        });
    }

    getProductByProductId(productId) {
         let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:8000/api/getproductbyid.php?id=' + productId;
        return this.http.get(url,options).map((response) => {
            return response;
        });
    }

    updateProduct(newProduct) {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post('http://localhost:8000/api/updateproduct.php', {
            id: newProduct.id,
            name: newProduct.newProductName,
            price: newProduct.newProductPrice,
            quantity: newProduct.newProductQuantity
        }, options).map((response) => {
            return response.json();
        });
    }

    deleteProduct(productId) {
         let options = new RequestOptions({ headers: this.headers });
        let url = 'http://localhost:8000/api/deleteproduct.php?id=' + productId;
        return this.http.get(url,options).map((response) => {
            return response;
        });
    }

}