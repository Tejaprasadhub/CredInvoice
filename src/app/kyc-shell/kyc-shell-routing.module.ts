import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycShellComponent } from './kyc-shell.component';
import { KycInfoComponent } from './kyc-info/kyc-info.component';

const routes: Routes = [
  { path: 'view', component: KycInfoComponent,data: { title: 'KYC Information' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycShellRoutingModule { }
