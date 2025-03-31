import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReportsComponent } from './reports/reports.component';
import { VendorsComponent } from './vendors/vendors.component';
import { NegotiateComponent } from './negotiate/negotiate.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,data: { title: 'Dashboard' } },
  { path: 'invoices', component: InvoicesComponent,data: { title: 'Invoices' } },
  { path: 'reports', component: ReportsComponent,data: { title: 'Reports' } },
  { path: 'vendors', component: VendorsComponent,data: { title: 'My Vendors' } },
  { path: 'negotiate', component: NegotiateComponent,data: { title: 'Negotiate' } },
  { path: 'bidding', component: VendorsComponent,data: { title: 'Bidding Management' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
