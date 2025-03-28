import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private router: Router) {}

  forgotPassword(){
        this.router.navigate(['/forgot-password']);  // define your component where you want to go
  }
  login(){
    this.router.navigate(['/login']);  // define your component where you want to go
  }
  kyc(){
    this.router.navigate(['/kyc']);  // define your component where you want to go
  }
}
