import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../@shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!: FormGroup;
  registerSubmitAttempt:boolean=false;
  showPasswordInfoPopup:boolean=false;
  private ngUnsubscribe = new Subject();

  userType:string="BUYER";

  constructor(private router: Router,private authService : AuthService,private fb: FormBuilder) {}

  forgotPassword(){
        this.router.navigate(['/forgot-password']);  // define your component where you want to go
  }
  login(){
    this.router.navigate(['/login']);  // define your component where you want to go
  }

  changeUserType(userType:string){
    this.userType = userType;
  }
  signUpFormFormSubmit(){
    this.registerSubmitAttempt = true;
    if (this.signUpForm.valid) {
      this.registerSubmitAttempt = false;
      this.authService.register(this.signUpForm.value,this.userType)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        {
          next: data => {
            localStorage.setItem("userEmail",this.signUpForm.value.email);
            this.router.navigate(['/verify']);
          },
          error: err => {
          }
        }
      )
    }
    //   // define your component where you want to go
  }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      'firstname': new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')] }),
      'lastname': new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')] }),
      'company': new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-z A-Z0-9]*$')] }),
      'pan': new FormControl('', { validators: [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')] }),
      'email': new FormControl('', { validators: [Validators.required, Validators.email] }),
      'password': new FormControl('', { validators: [Validators.required, Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$')] }),
      'confirmpassword': new FormControl('', { validators: [Validators.required, Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$')] })
    },
    {
      validator: this.checkPasswords('password', 'confirmpassword'),
    })
  }

  checkPasswords(passWord: string, confirmPassWord: string) {
    return (formGroup: FormGroup) => {
      let pass = formGroup.controls[passWord].value;
      let confirmPass = formGroup.controls[confirmPassWord].value;
      if (pass != null && confirmPass != null && pass != "" && confirmPass != "") {
        return pass === confirmPass
          ? formGroup.controls[confirmPassWord].setErrors(null)
          : formGroup.controls[confirmPassWord].setErrors({ notSame: true });
      }
    };
  }
}
