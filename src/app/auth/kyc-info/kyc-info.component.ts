import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengModule } from '../../primeng.module';

@Component({
  selector: 'app-kyc-info',
  standalone: false,
  templateUrl: './kyc-info.component.html',
  styleUrl: './kyc-info.component.scss'
})
export class KycInfoComponent {
  constructor(private router: Router) {}

  login(){
        this.router.navigate(['/login']);  // define your component where you want to go
  }

  profieVerificaion(){
    this.router.navigate(['/profile-verification']);
  }

  onUpload(event:any){

  }
}
