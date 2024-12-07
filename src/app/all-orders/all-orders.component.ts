import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {

     title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  allOrders: any[] = [];

  constructor(private observer: BreakpointObserver, private router: Router, private dataService: DataService, private datePipe: DatePipe) { }
  
ngOnInit() {
    // Fetch data on component initialization
     this.fetchRecentOrders();
     this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  fetchRecentOrders() {
    this.dataService.getAllOrders().subscribe(
      (orders: any[]) => {
        // Transform date strings to "dd-mm-yyyy" format
        this.allOrders = orders.map(order => {
          return {
            ...order,
            order_date: this.transformDate(order.order_date)
          };
        });
      },
      error => {
        console.error('Error fetching recent orders:', error);
      }
    );
  }

  transformDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
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
    this.router.navigate(['/addProducts'])
  }
 viewProducts() {
    this.router.navigate(['/viewProducts']);
  }
  analytics() {
    this.router.navigate(['/analytics']);
  }
  
}
