import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalSales = 125000;
  totalProducts = 320;
  lowStockItems = 18;
  totalInvoices = 87;

  salesChart = [12000, 18000, 14000, 22000, 26000, 30000];

  constructor() {}

  ngOnInit(): void {}

}