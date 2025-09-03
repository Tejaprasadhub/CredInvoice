import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { KycService } from '../../@shared/services/kyc.service';
import { Subject, takeUntil } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';

@Component({
   selector: 'app-kyc-info',
  standalone: false,
  templateUrl: './kyc-info.component.html',
  styleUrl: './kyc-info.component.scss'
})
export class KycInfoComponent {
    private ngUnsubscribe = new Subject();
  
  companyForm: FormGroup;
  businessTaxForm: FormGroup;
  bankForm: FormGroup;
  addressForm: FormGroup;
  documentForm: FormGroup;
  activeStepIndex = 0;
  progress = 0;
  kycSubmitAttempt = false;
  companyTypes = [
  ];
  documentTypes = [
  ];
  steps: MenuItem[] = [
    { label: 'Company Details' },
    { label: 'Business & Tax Details' },
    { label: 'Bank Details' },
    { label: 'Address Details' },
    { label: 'Document Details' }
  ];
kycSubmissions:any[]=[];
 first = 0;
 uploadedFiles: any[] = [];
 kycDocuments:any[]=[];
 @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(private fb: FormBuilder,private kycService : KycService) {
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

    this.documentForm = this.fb.group({
     documentType: ['', Validators.required]
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
    const forms = [this.companyForm, this.businessTaxForm, this.bankForm, this.addressForm,this.documentForm];
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

      let kycRequestObject:any={};
      kycRequestObject.company_type_id = this.companyForm.get('companyType')?.value?.value;
      kycRequestObject.form_data = {
        company_name: this.companyForm.get('company')?.value,
        company_type: '',
        email: this.companyForm.get('email')?.value,
        phone_number: this.companyForm.get('phone')?.value,
        nature_of_business: this.companyForm.get('nature')?.value,
        business_pan: this.businessTaxForm.get('pan')?.value,
        gst_number: this.businessTaxForm.get('gst')?.value,
        bank_account_number: this.bankForm.get('accountNumber')?.value,
        bank_ifsc_number: this.bankForm.get('ifsc')?.value,
        communication_address: {
          address_line_1: this.addressForm.get('addrline1')?.value,
          address_line_2: this.addressForm.get('addrline2')?.value,
          district: this.addressForm.get('district')?.value,
          city: this.addressForm.get('city')?.value,
          state: this.addressForm.get('state')?.value,
          pin_code: this.addressForm.get('pincode')?.value,
          country: this.addressForm.get('country')?.value
        },
        billing_address: {
          same_as_communication: this.addressForm.get('checked')?.value,
          address_line_1: this.addressForm.get('baddrline1')?.value,
          address_line_2: this.addressForm.get('baddrline2')?.value,
          district: this.addressForm.get('bdistrict')?.value,
          city: this.addressForm.get('bcity')?.value,
          state: this.addressForm.get('bstate')?.value,
          pin_code: this.addressForm.get('bpincode')?.value,
          country: this.addressForm.get('bcountry')?.value
        }
      };
      this.submitKyc(kycRequestObject);
      // Add API call or further logic here
    }
  }

  BindKycData(){
    if(this.kycSubmissions?.length > 0){
      const kycData = this.kycSubmissions[0]?.form_data;
      this.companyForm.patchValue({
        company: kycData?.company_name,
        companyType: this.companyTypes.find((ct:any) => ct?.id === kycData?.company_type_id) || '',
        email: kycData?.email,
        phone: kycData?.phone_number,
        nature: kycData?.nature_of_business,
        incorpDate: kycData?.incorpDate // Assuming incorpDate is not part of form_data
      });
      this.businessTaxForm.patchValue({
        pan: kycData?.business_pan,
        gst: kycData?.gst_number
      });
      this.bankForm.patchValue({
        accountNumber: kycData?.bank_account_number,
        ifsc: kycData?.bank_ifsc_number
      });
      this.addressForm.patchValue({
        addrline1: kycData?.communication_address?.address_line_1,
        addrline2: kycData?.communication_address?.address_line_2,
        district: kycData?.communication_address?.district,
        city: kycData?.communication_address?.city,
        state: kycData?.communication_address?.state,
        pincode: kycData?.communication_address?.pin_code,
        country: kycData?.communication_address?.country,
        checked: kycData?.billing_address?.same_as_communication, 
        baddrline1: kycData?.billing_address?.address_line_1,
        baddrline2: kycData?.billing_address?.address_line_2,
        bdistrict: kycData?.billing_address?.district,
        bcity: kycData?.billing_address?.city,
        bstate: kycData?.billing_address?.state,
        bpincode: kycData?.billing_address?.pin_code,
        bcountry: kycData?.billing_address?.country
      });
    }
  }

  submitKyc(kycRequestObject:any){ 
     this.kycService.createKyc(kycRequestObject)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if (result.status) {
          this.kycSubmitAttempt = false;
          this.getKycSubmissions();
          this.getDocumnetTypes((this.companyForm.get('companyType')?.value?.value));
          this.nextStep();
        }
      })
    }
  ngOnInit() {
     this.getCompanyTypes();
     this.getKycSubmissions();
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

     getDocumnetTypes(companyTypeId:string) {
        this.kycService.getDocumentTypes(companyTypeId)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            if(result?.data?.documents?.length > 0) {
           this.documentTypes = result?.data?.documents?.map((documentType: any) => ({
          label: documentType?.document_type?.name + (this.kycDocuments?.some((doc: any) => doc.document_type.id === documentType?.document_type?.id) ? '    (Uploaded)' : ''),
          value: documentType?.document_type?.id,
          desc:  documentType?.document_type?.description,
          disabled: this.kycDocuments?.some((doc: any) => doc.document_type.id === documentType?.document_type?.id)
        }));
        }else {
          this.documentTypes= [];
        }
          })
    }

    getKycSubmissions() {
        this.kycService.getKycSubmissions()
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            this.kycSubmissions = result?.data || [];             
            this.kycDocuments = result?.data[0]?.documents || [];        
            // this.getDocumnetTypes((this.companyForm.get('companyType')?.value?.value));     
            this.BindKycData();
            if(this.kycSubmissions?.length > 0){
              this.getDocumnetTypes(this.kycSubmissions[0]?.company_type_id);
              this.updateProgress(4);
            }
          })
    }

    deleteDocument(document: any) {
      this.kycService.deleteKycDocument(this.kycSubmissions[0]?.id,document?.id)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if (result.status) {
          this.uploadedFiles = [];
           this.fileUpload.clear();
          this.documentForm.reset();
          // this.getDocumnetTypes((this.companyForm.get('companyType')?.value?.value));
          this.getKycSubmissions();
        }
      });
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
  }

  onDocumentUploadSubmit() {
    this.kycSubmitAttempt = true;
    if(this.uploadedFiles.length === 0){
      return;
    }
    this.kycService.uploadKycDocument(this.uploadedFiles[0],this.documentForm.value,this.kycSubmissions[0]?.id)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if (result.status) {
          this.kycSubmitAttempt = false;
          this.uploadedFiles = [];
          this.documentForm.reset();
           this.fileUpload.clear();
          this.getKycSubmissions();

        }
      });
    }

     
downloadBase64File(base64: string, fileName: string, mimeType: string) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: mimeType });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
}
}
