import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../../core/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductFormComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'] 
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {

    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteProduct(id: string) {

    if (!confirm('Delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      }
    });
  }
}