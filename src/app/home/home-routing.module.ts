import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReportsComponent } from './reports/reports.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { CreateInvoicesComponent } from './create-invoices/create-invoices.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { BiddingComponent } from './bidding/bidding.component';
import { SessionStorageTokenService } from '../@shared/services/session-storage-token.service';
import { SellerInvoiceDetailsComponent } from './seller-invoice-details/seller-invoice-details.component';
import { SellerInvoicesComponent } from './seller-invoices/seller-invoices.component';
const isSeller = sessionStorage.getItem("role")  === 'seller';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,data: { title: 'Dashboard' } },
  { path: 'invoices', component: CreateInvoicesComponent,data: { title: 'Invoices' } },
  { path: 'seller-invoices', component: SellerInvoicesComponent,data: { title: 'Invoices' } },
  { path: 'create-invoice', component: CreateInvoiceComponent,data: { title: 'Create Invoice' } },
  { path: 'invoice-details/:id', component: !isSeller ? InvoiceDetailsComponent : SellerInvoiceDetailsComponent,data: { title: 'Invoice Details' } },
  { path: 'reports', component: ReportsComponent,data: { title: 'Reports' } },
  { path: 'vendors', component: VendorsComponent,data: { title: 'My Vendors' } },
  { path: 'negotiate', component: NegotiateComponent,data: { title: 'Negotiate' } },
  { path: 'bidding', component: BiddingComponent,data: { title: 'Bidding Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { 
}
