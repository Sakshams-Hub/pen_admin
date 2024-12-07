import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from "../chart.service";
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  ordersData: any = {};
  salesData: any = {};
  ordersChart!: Chart<"bar">;
  salesChart!: Chart<"line">;
  ordersPerMonthData: any = {};
  salesPerMonthData: any = {};

    @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  constructor(private chartService: ChartService, private router : Router,private observer: BreakpointObserver) { }

    ngOnInit() {
    // Fetch data on component initialization
     this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  ngAfterViewInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.ordersChart) {
      this.ordersChart.destroy();
    }
    if (this.salesChart) {
      this.salesChart.destroy();
    }
  }

  fetchData(): void {
    this.chartService.getOrdersPerDay().subscribe(
      data => {
        this.ordersData = data;
        this.plotOrdersChart();
      },
      error => {
        console.error('Error fetching orders data:', error);
      }
    );

 this.chartService.getSalesPerDay().subscribe(
    data => {
      // Assuming data is already in the format { labels: [], values: [] }
      this.salesData = data;
      this.plotSalesChart();
    },
    error => {
      console.error('Error fetching sales data:', error);
    }
    );
      this.chartService.getOrdersPerMonth().subscribe(
      data => {
        this.ordersPerMonthData = data;
        this.plotOrdersPerMonthChart();
      },
      error => {
        console.error('Error fetching orders per month data:', error);
      }
    );

    this.chartService.getSalesPerMonth().subscribe(
      data => {
        this.salesPerMonthData = data;
        this.plotSalesPerMonthChart();
      },
      error => {
        console.error('Error fetching sales per month data:', error);
      }
    );
  }

  plotOrdersChart(): void {
    const labels = this.ordersData.labels.map((label: string) => label.split('T')[0]); // Extracting only the date part
    const values = this.ordersData.values;

    const ctx = document.getElementById('ordersChart') as HTMLCanvasElement;
    this.ordersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Orders per Day',
          data: values,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false, // Disable aspect ratio to control size
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  plotSalesChart(): void {
  const labels = this.salesData.labels.map((label: string) => label.split('T')[0]); // Extracting only the date part
  const sales = this.salesData.values;

  const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
  this.salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Sales per Day',
        data: sales,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      maintainAspectRatio: false, // Disable aspect ratio to control size
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: any) {
              return '₹' + value;
            }
          }
        }
      }
    }
  });
  }
  
  plotOrdersPerMonthChart(): void {
    const labels = this.ordersPerMonthData.labels;
    const values = this.ordersPerMonthData.values;

    const ctx = document.getElementById('ordersPerMonthChart') as HTMLCanvasElement;
    this.ordersChart = new Chart(ctx, {
      type: 'bar', // Use bar chart for orders per month
      data: {
        labels: labels,
        datasets: [{
          label: 'Orders per Month',
          data: values,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  plotSalesPerMonthChart(): void {
    const labels = this.salesPerMonthData.labels;
    const values = this.salesPerMonthData.values;

    const ctx = document.getElementById('salesPerMonthChart') as HTMLCanvasElement;
    this.salesChart = new Chart(ctx, {
      type: 'line', // Use line chart for sales per month
      data: {
        labels: labels,
        datasets: [{
          label: 'Sales per Month',
          data: values,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '₹' + value;
              }
            }
          }
        }
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

  dashboard() {
    this.router.navigate(['/dashboard'])
  }


}
