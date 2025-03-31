import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimengModule } from '../primeng.module';
import { FormsModule } from '@angular/forms';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReportsComponent } from './reports/reports.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { BiddingComponent } from './bidding/bidding.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    InvoicesComponent,
    ReportsComponent,
    VendorsComponent,
    NegotiateComponent,
    BiddingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
