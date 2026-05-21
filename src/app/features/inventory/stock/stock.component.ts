import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryService, InventoryTransactionDto, InventoryTransactionType } from '../../../core/services/inventory.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock',
  imports:[CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  form!: FormGroup;
  transactions: InventoryTransactionDto[] = [];
  loading = false;

  types = InventoryTransactionType;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTransactions();
  }

  initForm() {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      type: [InventoryTransactionType.StockIn, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  loadTransactions() {
    this.inventoryService.getAllTransactions().subscribe({
      next: (res) => this.transactions = res
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.inventoryService.createTransaction(this.form.value).subscribe({
      next: (res) => {
        this.transactions.unshift(res);
        this.form.reset({ type: InventoryTransactionType.StockIn, quantity: 1 });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}