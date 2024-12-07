import { Route, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  
   title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;


  usersCount: number = 0;
  productsCount: number = 0;
  salesTotal: number = 0;
  ordersCount: number = 0;

  public routeLinks = [
     { link: "about", name: "About", icon: "dashboard" },
    { link: "locations", name: "Locations", icon: "account_balance" },
  ]
recentOrders: any[] = [];

  constructor(private observer: BreakpointObserver, private router: Router, private dataService: DataService, private datePipe: DatePipe) { }
  
  ngOnInit() {
    // Fetch data on component initialization
    this.fetchData();
     this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  fetchData() {
  this.dataService.getUsersCount().subscribe(
  count => {
    console.log("Users count received:", count);
    this.usersCount = count;
  },
  error => {
    console.error("Error fetching users count:", error);
  }
);
    
 this.dataService.getProductsCount().subscribe(
  count => {
    console.log("Products count received:", count);
    this.productsCount = count;
  },
  error => {
    console.error("Error fetching products count:", error);
  }
    );
    
   this.dataService.getOrdersCount().subscribe(
  count => {
    console.log("Orders count received:", count);
    this.ordersCount = count;
  },
  error => {
    console.error("Error fetching orders count:", error);
  }
    );  
    
 this.dataService.getSalesTotal().subscribe(
  total => {
    console.log("Sales Total:", total);
    this.salesTotal = total;
  },
  error => {
    console.error("Error fetching total sales:", error);
  }
    ); 

    this.fetchRecentOrders();
  
  }


  fetchRecentOrders() {
    this.dataService.getRecentOrders().subscribe(
      (orders: any[]) => {
        // Transform date strings to "dd-mm-yyyy" format
        this.recentOrders = orders.map(order => {
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

  addProduct() {
    this.router.navigate(['/addProducts'])
  }
 viewProducts() {
    this.router.navigate(['/viewProducts']);
  }

  allOrders() {
    this.router.navigate(['/allOrders']);
  }

  analytics() {
    this.router.navigate(['/analytics']);
  }

  admin_login() {
    this.router.navigate(['/admin_login'])
  }

}

