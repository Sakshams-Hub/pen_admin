import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'console';
import { response } from 'express';



@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.scss'
})
export class AddproductsComponent {
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;



  productData = { product_name: '', price: "", quantity: "", description: "" ,actual_price:""};
 selectedImage: File | null = null;

  constructor(private observer: BreakpointObserver, private router : Router ,private http : HttpClient , private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  dashboard() {
    this.router.navigate(['/dashboard'])
  }

  viewProducts() {
    this.router.navigate(['/viewProducts']);
  }


  onSubmit() {
  const formData = new FormData();
  formData.append('product_name', this.productData.product_name);
  formData.append('price', this.productData.price);
  formData.append('quantity', this.productData.quantity);
  formData.append('description', this.productData.description);
  formData.append('actual_price', this.productData.actual_price);
  // Append other product data as needed
  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }

  this.http.post('http://localhost:3000/addproducts', formData).subscribe(
    (response: any) => {
      console.log("Products Added Successfully", response);
      this.productData = { product_name: '', price: "", quantity: "", description: "", actual_price: "" };
      this.snackBar.open("Product added successfully!", "", {
        duration: 1500,
      });
    },
    (error) => {
      console.log("Unable to add products");
    }
  );
}

   onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

   allOrders() {
    this.router.navigate(['/allOrders']);
  }
  analytics() {
    this.router.navigate(['/analytics']);
  }


  
}
