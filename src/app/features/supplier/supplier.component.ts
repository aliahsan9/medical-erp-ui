import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supplier, SupplierService } from '../../core/services/supplier.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[] = [];

  loading = false;

  supplier: Supplier = {
    name: '',
    phoneNumber: '',
    address: ''
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.loading = true;

    this.supplierService.getSuppliers().subscribe({
      next: (res) => {
        this.suppliers = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  createSupplier() {

    if (!this.supplier.name.trim()) return;

    this.supplierService.createSupplier(this.supplier).subscribe({
      next: () => {

        this.supplier = {
          name: '',
          phoneNumber: '',
          address: ''
        };

        this.loadSuppliers();
      }
    });
  }
}