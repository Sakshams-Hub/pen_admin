import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
 productId: string = '';
  product: any;
  error: string | undefined;
  productData: any = {}; 
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild('imageInput') imageInput: ElementRef | undefined; 
  isMobile= true;
  isCollapsed = true;

  constructor(private route: ActivatedRoute, private productService: ProductService,private router : Router,private observer: BreakpointObserver ) { }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id !== null) {
      this.productId = id;
      this.productService.getProduct(this.productId).subscribe(
        (data: any) => {
          this.product = data;
          // Pre-fill the form fields with the product details
          this.productData = {
            product_name: this.product.product_name,
            description: this.product.description,
            quantity: this.product.quantity,
            price: this.product.price,
            actual_price: this.product.actual_price
          };
        },
        (error: any) => {
          this.error = error.message || 'Internal server error';
        }
      );
    } else {
      console.error('Product ID is null.');
    }
  });

     this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

onSubmit() {
  // Get the selected image file
  const imageFile = this.imageInput?.nativeElement?.files?.[0];
  if (!imageFile) {
    console.error('No image selected.');
    return;
  }

  // Send HTTP PUT request to update product details
  this.productService.updateProduct(this.productId, this.productData, imageFile).subscribe(
    (response: any) => {
      console.log('Product updated successfully:', response);
    },
    (error: any) => {
      console.error('Error updating product:', error);
    }
  );
}


  onFileSelected(event: any) {
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
 allOrders() {
    this.router.navigate(['/allOrders']);
  }

  analytics() {
   this.router.navigate(['/analytics'])
 }
}

