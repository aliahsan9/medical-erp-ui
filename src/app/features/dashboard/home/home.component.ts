import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports:[CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // =========================
  // KPI DATA (DUMMY)
  // =========================
  totalSales = 125000;
  totalProducts = 320;
  lowStockItems = 18;
  totalInvoices = 87;

  // =========================
  // CHART DATA (DUMMY)
  // =========================
  salesChart = [12000, 18000, 14000, 22000, 26000, 30000];
  stockChart = [300, 280, 260, 240, 220, 200];

  constructor() {}

  ngOnInit(): void {}
}