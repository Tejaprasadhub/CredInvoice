// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { PrimengModule } from '../../primeng.module';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Subject, takeUntil } from 'rxjs';
// import { KycService } from '../../@shared/services/kyc.service';

// @Component({
//   selector: 'app-kyc-info',
//   standalone: false,
//   templateUrl: './kyc-info.component.html',
//   styleUrl: './kyc-info.component.scss'
// })
// export class KycInfoComponent {
//   uploadedFiles: any[] = [];
//   kycForm!: FormGroup;
//   private ngUnsubscribe = new Subject();
//   companyTypes:any[]=[];
//     kycFormSubmitAttempt:boolean=false;
//     checked: boolean = false;
//   constructor(private router: Router,private fb: FormBuilder,
//     private kycService : KycService
//   ) {}

//   login(){
//         this.router.navigate(['/login']);  
//   }

//   profieVerificaion(){
//     this.router.navigate(['/profile-verification']);
//   }


//   ngOnInit(): void {
//     this.getCompanyTypes();
//     this.createKycForm();
//   }

//   createKycForm() {
//     this.kycForm = this.fb.group({
//       'incorpDate': new FormControl('', { validators: [Validators.required] }),
//       'nature': new FormControl('', { validators: [Validators.required] }),
//       'pan': new FormControl('', { validators: [Validators.required] }),
//       'company': new FormControl('', { validators: [Validators.required] }),
//       'companyType': new FormControl('', { validators: [Validators.required] }),
//       'phone': new FormControl('', { validators: [Validators.required] }),
//       'email': new FormControl('', { validators: [Validators.required, Validators.email] }),
//       'gst': new FormControl('', { validators: [Validators.required] }),
//       'accountNumber': new FormControl('', { validators: [Validators.required] }),
//       'ifsc': new FormControl('', { validators: [Validators.required] }),
//       'addrline1': new FormControl('', { validators: [Validators.required] }),
//       'addrline2': new FormControl('', { validators: [Validators.required] }),
//       'district': new FormControl('', { validators: [Validators.required] }),
//       'city': new FormControl('', { validators: [Validators.required] }),
//       'state': new FormControl('', { validators: [Validators.required] }),
//       'pincode': new FormControl('', { validators: [Validators.required] }),
//       'country': new FormControl('', { validators: [Validators.required] }),
//       'baddrline1': new FormControl('', { validators: [Validators.required] }),
//       'baddrline2': new FormControl('', { validators: [Validators.required] }),
//       'bdistrict': new FormControl('', { validators: [Validators.required] }),
//       'bcity': new FormControl('', { validators: [Validators.required] }),
//       'bstate': new FormControl('', { validators: [Validators.required] }),
//       'bpincode': new FormControl('', { validators: [Validators.required] }),
//       'bcountry': new FormControl('', { validators: [Validators.required] }),
//       'checked': new FormControl('', { validators: [Validators.required] })
//     })
//   }

//   onUpload(event: any) {
//     for (let file of event.files) {
//       this.uploadedFiles.push(file);
//     }
//   } 

//   onSelectedFiles(event: any) {
//     for (let file of event.files) {
//       this.uploadedFiles.push(file);
//     } 
//     console.log(this.uploadedFiles);
//   }

//   kycFormFormSubmit(){
//      this.kycFormSubmitAttempt = true;
//     if (this.kycForm.valid) {
//       this.kycFormSubmitAttempt = false;
//     }
//   }

//    getCompanyTypes() {
//         this.kycService.getCompanyTypes()
//           .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
//             if(result.data?.length > 0) {
//            this.companyTypes = result.data.map((companyType: any) => ({
//           label: companyType?.name,
//           value: companyType?.id,
//           desc:  companyType?.description
//         }));
//         }else {
//           this.companyTypes= [];
//         }
//           })
//     }
// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';

@Component({
   selector: 'app-kyc-info',
  standalone: false,
  templateUrl: './kyc-info.component.html',
  styleUrl: './kyc-info.component.scss'
})
export class KycInfoComponent {
  companyForm: FormGroup;
  businessTaxForm: FormGroup;
  bankForm: FormGroup;
  addressForm: FormGroup;
  activeStepIndex = 0;
  progress = 0;
  kycSubmitAttempt = false;
  companyTypes = [
    { label: 'Private Limited', value: 'Private Limited' },
    { label: 'Public Limited', value: 'Public Limited' },
    { label: 'Partnership', value: 'Partnership' }
  ];
  steps: MenuItem[] = [
    { label: 'Company Details' },
    { label: 'Business & Tax Details' },
    { label: 'Bank Details' },
    { label: 'Address Details' }
  ];

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      company: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      companyType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      nature: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      incorpDate: ['', Validators.required]
    });

    this.businessTaxForm = this.fb.group({
      pan: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      // gst: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{3}$/)]]
      gst: ['', [Validators.required]]
    });

    this.bankForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{9,18}$/)]],
      ifsc: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]]
    });

    this.addressForm = this.fb.group({
      addrline1: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,]+$/)]],
      addrline2: ['', [Validators.pattern(/^[a-zA-Z0-9\s,]*$/)]],
      district: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      state: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      checked: [false],
      baddrline1: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,]+$/)]],
      baddrline2: ['', [Validators.pattern(/^[a-zA-Z0-9\s,]*$/)]],
      bdistrict: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      bcity: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      bstate: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      bpincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      bcountry: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });

    this.addressForm.get('checked')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.copyCommunicationToBilling();
      } else {
        this.clearBillingAddress();
      }
    });

    this.updateProgress(0);
  }

  updateProgress(stepIndex: number) {
    this.activeStepIndex = stepIndex;
    this.progress = ((stepIndex + 1) / this.steps.length) * 100;
  }

  nextStep() {
    this.kycSubmitAttempt = true;
    const forms = [this.companyForm, this.businessTaxForm, this.bankForm, this.addressForm];
    if (forms[this.activeStepIndex].valid && this.activeStepIndex < this.steps.length - 1) {
      this.updateProgress(this.activeStepIndex + 1);
    }
  }

  prevStep() {
    if (this.activeStepIndex > 0) {
      this.updateProgress(this.activeStepIndex - 1);
    }
  }

  copyCommunicationToBilling() {
    const comm = this.addressForm.value;
    this.addressForm.patchValue({
      baddrline1: comm.addrline1,
      baddrline2: comm.addrline2,
      bdistrict: comm.district,
      bcity: comm.city,
      bstate: comm.state,
      bpincode: comm.pincode,
      bcountry: comm.country
    });
  }

  clearBillingAddress() {
    this.addressForm.patchValue({
      baddrline1: '',
      baddrline2: '',
      bdistrict: '',
      bcity: '',
      bstate: '',
      bpincode: '',
      bcountry: ''
    });
  }

  kycFormSubmit() {
    this.kycSubmitAttempt = true;
    if (this.companyForm.valid && this.businessTaxForm.valid && this.bankForm.valid && this.addressForm.valid) {
      console.log('KYC Form Submitted:', {
        company: this.companyForm.value,
        businessTax: this.businessTaxForm.value,
        bank: this.bankForm.value,
        address: this.addressForm.value
      });
      // Add API call or further logic here
    }
  }
}
