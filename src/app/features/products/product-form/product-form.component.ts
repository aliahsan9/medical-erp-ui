import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {

  @Output() productCreated = new EventEmitter<void>();

  @Input() editMode = false;

  @Input() productId = '';

  product: Product = {
    name: '',
    category: '',
    price: 0,
    costPrice: 0,
    stockQuantity: 0,
    expiryDate: '',
    barcode: '',
    isActive: true
  };

  categories = [
    'Tablet',
    'Capsule',
    'Injection',
    'Syrup',
    'Cream',
    'Drops'
  ];

  loading = false;

  constructor(private productService: ProductService) {}

  submitForm() {

    this.loading = true;

    if (this.editMode) {

      this.productService.updateProduct(this.productId, this.product)
        .subscribe({
          next: () => {
            this.loading = false;
            this.productCreated.emit();
          }
        });

    } else {

      this.productService.createProduct(this.product)
        .subscribe({
          next: () => {

            this.loading = false;

            this.product = {
              name: '',
              category: '',
              price: 0,
              costPrice: 0,
              stockQuantity: 0,
              expiryDate: '',
              barcode: '',
              isActive: true
            };

            this.productCreated.emit();
          }
        });
    }
  }
}