import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { error } from 'console';
import { subscribe } from 'diagnostics_channel';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;


  products:any[] = []



  constructor(private observer: BreakpointObserver, private router : Router ,private http : HttpClient,private productService :ProductService) { }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.fetchProducts();


     this.productService.getProducts().subscribe((data: any) => {
      this.products = data; // Assign fetched products to the products property
    });
  }

  fetchProducts() : void{
    this.http.get<any[]>('http://localhost:3000/getproducts').subscribe((products: any[]) => {
      console.log(products);
      
      this.products = products;
    },
    (error: any) => {
      console.log(error);   
    }
    );
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
  addProduct() {
    this.router.navigate(['/addProducts']);
  }
  
   allOrders() {
    this.router.navigate(['/allOrders']);
  }

    analytics() {
    this.router.navigate(['/analytics']);
  }
  }


