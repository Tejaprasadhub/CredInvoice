import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyComponent } from './verify/verify.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PrimengModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileVerificationComponent } from './profile-verification/profile-verification.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyComponent,
    ChangePasswordComponent,
    ProfileVerificationComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,    
    ReactiveFormsModule,   
    FormsModule,    
    PrimengModule,
    // BrowserAnimationsModule    
  ]
})
export class AuthModule { }
