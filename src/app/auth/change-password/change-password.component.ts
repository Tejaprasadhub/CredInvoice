import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  otpvalue:any=123456;
  constructor(private router: Router) {}

  login(){
        this.router.navigate(['/login']);  // define your component where you want to go
  }

  verify(){
    this.router.navigate(['/change-password']);
  }
}
