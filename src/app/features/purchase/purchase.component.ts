import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier, SupplierService } from '../../core/services/supplier.service';
import { Product, ProductService } from '../../core/services/product.service';
import { PurchaseDto, PurchaseService } from '../../core/services/purchase.service';
import { RouterModule } from '@angular/router';
import { SupplierComponent } from '../supplier/supplier.component';


@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SupplierComponent
  ],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  suppliers: Supplier[] = [];
  products: Product[] = [];

  purchases: PurchaseDto[] = [];

  loading = false;

  selectedSupplier = '';

  purchaseItems: any[] = [
    {
      productId: '',
      quantity: 1,
      unitCostPrice: 0
    }
  ];

  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {

    this.loadSuppliers();
    this.loadProducts();
    this.loadPurchases();
  }

  loadSuppliers() {

    this.supplierService.getSuppliers()
      .subscribe({
        next: (res) => {
          this.suppliers = res;
        }
      });
  }

  loadProducts() {

    this.productService.getProducts()
      .subscribe({
        next: (res) => {
          this.products = res;
        }
      });
  }

  loadPurchases() {

    this.loading = true;

    this.purchaseService.getAllPurchases()
      .subscribe({
        next: (res) => {

          this.purchases = res;

          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  addItem() {

    this.purchaseItems.push({
      productId: '',
      quantity: 1,
      unitCostPrice: 0
    });
  }

  removeItem(index: number) {

    this.purchaseItems.splice(index, 1);
  }

  getTotal() {

    return this.purchaseItems.reduce(
      (sum, item) =>
        sum + (item.quantity * item.unitCostPrice),
      0
    );
  }

  submitPurchase() {

    const payload = {
      supplierId: this.selectedSupplier,
      items: this.purchaseItems
    };

    this.purchaseService
      .createPurchase(payload)
      .subscribe({
        next: () => {

          this.selectedSupplier = '';

          this.purchaseItems = [
            {
              productId: '',
              quantity: 1,
              unitCostPrice: 0
            }
          ];

          this.loadPurchases();
        }
      });
  }
}