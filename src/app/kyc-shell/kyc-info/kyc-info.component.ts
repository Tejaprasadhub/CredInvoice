import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimengModule } from '../../primeng.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { KycService } from '../../@shared/services/kyc.service';

@Component({
  selector: 'app-kyc-info',
  standalone: false,
  templateUrl: './kyc-info.component.html',
  styleUrl: './kyc-info.component.scss'
})
export class KycInfoComponent {
  uploadedFiles: any[] = [];
  kycForm!: FormGroup;
  private ngUnsubscribe = new Subject();
  companyTypes:any[]=[];
    kycFormSubmitAttempt:boolean=false;
    checked: boolean = false;
  constructor(private router: Router,private fb: FormBuilder,
    private kycService : KycService
  ) {}

  login(){
        this.router.navigate(['/login']);  // define your component where you want to go
  }

  profieVerificaion(){
    this.router.navigate(['/profile-verification']);
  }


  ngOnInit(): void {
    this.getCompanyTypes();
    this.createKycForm();
  }

  createKycForm() {
    this.kycForm = this.fb.group({
      'incorpDate': new FormControl('', { validators: [Validators.required] }),
      'nature': new FormControl('', { validators: [Validators.required] }),
      'pan': new FormControl('', { validators: [Validators.required] }),
      'company': new FormControl('', { validators: [Validators.required] }),
      'companyType': new FormControl('', { validators: [Validators.required] }),
      'phone': new FormControl('', { validators: [Validators.required] }),
      'email': new FormControl('', { validators: [Validators.required, Validators.email] }),
      'gst': new FormControl('', { validators: [Validators.required] }),
      'accountNumber': new FormControl('', { validators: [Validators.required] }),
      'ifsc': new FormControl('', { validators: [Validators.required] }),
      'addrline1': new FormControl('', { validators: [Validators.required] }),
      'addrline2': new FormControl('', { validators: [Validators.required] }),
      'district': new FormControl('', { validators: [Validators.required] }),
      'city': new FormControl('', { validators: [Validators.required] }),
      'state': new FormControl('', { validators: [Validators.required] }),
      'pincode': new FormControl('', { validators: [Validators.required] }),
      'country': new FormControl('', { validators: [Validators.required] }),
      'baddrline1': new FormControl('', { validators: [Validators.required] }),
      'baddrline2': new FormControl('', { validators: [Validators.required] }),
      'bdistrict': new FormControl('', { validators: [Validators.required] }),
      'bcity': new FormControl('', { validators: [Validators.required] }),
      'bstate': new FormControl('', { validators: [Validators.required] }),
      'bpincode': new FormControl('', { validators: [Validators.required] }),
      'bcountry': new FormControl('', { validators: [Validators.required] }),
      'checked': new FormControl('', { validators: [Validators.required] })
      // 'confirmpassword': new FormControl('', { validators: [Validators.required, Validators.pattern('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$')] })
    })
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  } 

  onSelectedFiles(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    } 
    console.log(this.uploadedFiles);
  }

  kycFormFormSubmit(){
     this.kycFormSubmitAttempt = true;
    if (this.kycForm.valid) {
      this.kycFormSubmitAttempt = false;
    }
  }

   getCompanyTypes() {
        this.kycService.getCompanyTypes()
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            if(result.data?.length > 0) {
           this.companyTypes = result.data.map((companyType: any) => ({
          label: companyType?.name,
          value: companyType?.id,
          desc:  companyType?.description
        }));
        }else {
          this.companyTypes= [];
        }
          })
    }
}
