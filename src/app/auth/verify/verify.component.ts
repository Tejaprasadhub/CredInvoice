import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: false,
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  otpvalue:any=123456;
  constructor(private router: Router) {}

  login(){
        this.router.navigate(['/login']);  // define your component where you want to go
  }

  verify(){
    this.router.navigate(['/change-password']);
  }
}
