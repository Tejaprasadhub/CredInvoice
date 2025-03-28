import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(private router: Router) {}

  login(){
        this.router.navigate(['/login']);  // define your component where you want to go
  }

  sendCode(){
    this.router.navigate(['/verify']);
  }

}
