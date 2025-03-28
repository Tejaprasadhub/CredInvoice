import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  forgotPassword(){
        this.router.navigate(['/forgot-password']);  // define your component where you want to go
  }

  signup(){
    this.router.navigate(['/signup']);  // define your component where you want to go

  }
  signin(){
    this.router.navigate(['/home/dashboard']);  // define your component where you want to go

  }

}
