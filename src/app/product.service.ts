

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000'; 
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any[]>('http://localhost:3000/getproducts');
  }

  getProduct(id: string) {
    return this.http.get<any>('http://localhost:3000/products/'+ id);
  }

  updateProduct(productId: string, productData: any, imageFile: File | null) {
    const formData = new FormData();
    formData.append('product_name', productData.product_name);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('description', productData.description);
    formData.append('actual_price', productData.actual_price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Send PUT request with FormData
    return this.http.put(`${this.apiUrl}/update-product/${productId}`, formData);
  }
}
