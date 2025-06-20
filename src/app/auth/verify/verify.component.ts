import { Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../@shared/services/auth.service';

@Component({
  selector: 'app-verify',
  standalone: false,
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent  {
  verifyForm!: FormGroup;
  verifySubmitAttempt:boolean=false;
  private ngUnsubscribe = new Subject();
  otpvalue:any=123456;
  constructor(private router: Router,
    private route: ActivatedRoute,private authService : AuthService,private fb: FormBuilder) {}

  login(){
        this.router.navigate(['/login']);  // define your component where you want to go
  }

  verifyFormSubmit(){
    this.verifySubmitAttempt = true;
    if (this.verifyForm.valid) {
      this.verifySubmitAttempt = false;
      this.authService.validateOTP(this.verifyForm.value)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if (result.status) {
          localStorage.removeItem("userEmail");
          this.router.navigate(['/login'], { relativeTo: this.route });
        }else{

        }
        }
      )
    }
  }

  ngOnInit(): void {
    this.createVerifyForm();
  }

  createVerifyForm() {
    this.verifyForm = this.fb.group({
      'otp': new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] })
  })
}
}
