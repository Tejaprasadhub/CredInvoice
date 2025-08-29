import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../@shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginSubmitAttempt:boolean=false;
  private ngUnsubscribe = new Subject();
  constructor( private router: Router,
    private route: ActivatedRoute,private authService : AuthService,private fb: FormBuilder) {}

  forgotPassword(){
        this.router.navigate(['/forgot-password']);  // define your component where you want to go
  }

  signup(){
    this.router.navigate(['/signup']);  // define your component where you want to go

  }
  
  ngOnInit(): void {   
    this.createloginForm();
  }

  loginFormSubmit(){
    this.loginSubmitAttempt = true;
    if (this.loginForm.valid) {
      this.loginSubmitAttempt = false;
      this.authService.login(this.loginForm.value)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if (result.status) {
                    this.router.navigate(['/home/dashboard'], { relativeTo: this.route });

          // this.router.navigate(['/kyc/view'], { relativeTo: this.route });
        }
        else{
          this.router.navigate(['/login'], {relativeTo: this.route})
        }
      })
    }
  }

  createloginForm() {
    this.loginForm = this.fb.group({
       'email': new FormControl('', { validators: [Validators.required] }),
      'password': new FormControl('', { validators: [Validators.required] }),
    })
  }

}
