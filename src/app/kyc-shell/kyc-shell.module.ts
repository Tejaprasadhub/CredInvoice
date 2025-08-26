import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycShellRoutingModule } from './kyc-shell-routing.module';
import { KycShellComponent } from './kyc-shell.component';
import { KycInfoComponent } from './kyc-info/kyc-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng.module';


@NgModule({
  declarations: [
    KycShellComponent,
    KycInfoComponent
  ],
  imports: [
    CommonModule,
    KycShellRoutingModule,
    ReactiveFormsModule,   
    FormsModule,    
    PrimengModule
  ]
})
export class KycShellModule { }
