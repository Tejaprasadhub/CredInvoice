import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrimengModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReportsComponent } from './reports/reports.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { BiddingComponent } from './bidding/bidding.component';
import { CreateInvoicesComponent } from './create-invoices/create-invoices.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { SellerInvoiceDetailsComponent } from './seller-invoice-details/seller-invoice-details.component';
import { SellerInvoicesComponent } from './seller-invoices/seller-invoices.component';
import { InoviceBidsComponent } from './inovice-bids/inovice-bids.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KycSubmissionsComponent } from './kyc-submissions/kyc-submissions.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    InvoicesComponent,
    ReportsComponent,
    VendorsComponent,
    NegotiateComponent,
    BiddingComponent,
    CreateInvoicesComponent,
    CreateInvoiceComponent,
    InvoiceDetailsComponent,
    SellerInvoiceDetailsComponent,
    SellerInvoicesComponent,
    InoviceBidsComponent,
    HomepageComponent,
    KycSubmissionsComponent
  ],
  imports: [
    ReactiveFormsModule,  
    CommonModule,     
    FormsModule,
    PrimengModule,
    HomeRoutingModule
  ],
  providers:[HttpClient]
})
export class HomeModule { }
