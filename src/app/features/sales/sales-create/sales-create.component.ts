import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalesService } from '../../../core/services/sales.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales-create',
  imports:[CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss']
})
export class SalesCreateComponent implements OnInit {

  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerName: [''],
      items: this.fb.array([])
    });

    this.addItem(); // start with one row
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        productId: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]]
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.salesService.createSale(this.form.value).subscribe({
      next: () => {
        alert('Sale created successfully');
        this.form.reset();
        this.items.clear();
        this.addItem();
        this.loading = false;
      },
      error: () => {
        alert('Error creating sale');
        this.loading = false;
      }
    });
  }
}