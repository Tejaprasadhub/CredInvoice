import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { SellerService } from '../../@shared/services/seller.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-details',
  standalone: false,
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent {
    applyDiscountSelectedInvoice!: FormGroup;
  applyDiscountSelectedInvoiceSubmitAttempt: boolean = false;

  authorizeSelectedInvoice!: FormGroup;
  authorizeSelectedInvoiceSubmitAttempt: boolean = false;
     selectedInvoices: any[]=[];
   fundBy: any[] = [
    { label: 'Self', value: 'SELF' },
    { label: 'Financier', value: 'FINANCIER' }
  ];
  private ngUnsubscribe = new Subject();
  invoiceDetails:any;
  sellers: any[] =[];
  buyers: any[] =[];
  selectedCity: any;
  date1:any;
  uploadedFiles: any[] = [];
  visible:boolean=false;
  visible1:boolean=false;
  visible2:boolean=false;
  visible3:boolean=false;
  visible4:boolean=false;
  successFullPopup:boolean=false;
  products: any[]=[];
  first = 0;
  rows = 5;
  currentRole:string="";
  authorize:string="SELF";

  ngOnInit(){   
   this.route.params.subscribe((params: any) => {
      this.getInvoiceDetails(params['id']);
      this.currentRole = sessionStorage.getItem('role')?.toLowerCase() || '';
      if(this.currentRole === 'buyer') {
           this.getSellers();
      }else{
            this.getBuyers();
      }     
    });

    this.applyDiscountOnSelectedInvoiceForm();
    this.authorizeSelectedInvoiceInvoiceForm();
}

 authorizeType(userType:string){
    this.authorize = userType;
  }

getSellers() {
    this.sellerService.getSellersList()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if(result.data?.length > 0) {
         this.sellers = result.data.map((seller: any) => ({
          label: seller.first_name + ' ' + seller.last_name,
          value: seller.id,
          pan: seller.pan_number
        }));
        }else {
          this.sellers= [];
        }
      })
  }

  getBuyers() {
    this.sellerService.getbBuyersList()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if(result.data?.length > 0) {
           this.buyers = result.data.map((buyer: any) => ({
          label: buyer.first_name + ' ' + buyer.last_name,
          value: buyer.id,
          pan: buyer.pan_number
        }));
        }else {
          this.buyers= [];
        }
      })
  }

constructor(private route: ActivatedRoute,private messageService: MessageService,
  private incomeService: InvoiceService,private sellerService: SellerService,private fb: FormBuilder
  ) { }

  
onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

  //  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

getInvoiceDetails(id:string) {
  this.incomeService.getInvoiceDetails(id)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            if(result.status) {
              this.invoiceDetails = result.data;
            }
          })
}

 getSellerName(invoiceDetails: any) {
    return this.sellers.find(seller => seller.value === invoiceDetails?.seller_id)?.label || '';
  }
   getBuyerName(invoiceDetails: any) {
    return this.buyers.find(buyer => buyer.value === invoiceDetails?.buyer_id)?.label || '';
  }
   getSellerPanNumber(invoiceDetails: any) {
    return this.sellers.find(seller => seller.value === invoiceDetails?.seller_id)?.pan || '';
  }
  getBuyerPanNumber(invoiceDetails: any) {
    return this.buyers.find(buyer => buyer.value === invoiceDetails?.buyer_id)?.pan || '';
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

applyDiscountOnSelectedInvoiceForm() {
    this.applyDiscountSelectedInvoice = this.fb.group({
      'totalamount': new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] }),
      'totaldiscount': new FormControl('', { validators: [Validators.required] }),
      'totaldiscountedamount': new FormControl('', { validators: [Validators.required] }),
      'amountafterdiscount': new FormControl('', { validators: [Validators.required] }),
      'total_disbursement_date': new FormControl('', { validators: [Validators.required] }),
      'totalfundBy': new FormControl('', { validators: [Validators.required] }),
    })
  }
applyDiscountSelectedInvoiceSubmit(){
    this.applyDiscountSelectedInvoiceSubmitAttempt = true;
    const selectedInvoiceIds = this.selectedInvoices; // Extracting only the IDs of selected invoices
    if (this.applyDiscountSelectedInvoice.valid) {    
      this.applyDiscountSelectedInvoiceSubmitAttempt = false;
      this.applyDiscountSelectedInvoice.reset(); 
      //  this.invoiceService.applyDiscountOnInvoice(this.applyDiscountSelectedInvoice.value, selectedInvoiceIds)
      //   .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
      //     if (result.status) {
      //       this.applyDiscountSelectedInvoiceSubmitAttempt = false;
      //       this.applyDiscountSelectedInvoice.reset();
      //       this.visible = false;
      //       this.selectedInvoices = [];
      //       this.getInvoices();
      //     } else {
      //       this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
      //     }
      //   })
    }
}


authorizeSelectedInvoiceInvoiceForm() {
    this.authorizeSelectedInvoice = this.fb.group({
      'authtotalamount': new FormControl(''),
      'tenure': new FormControl(''),
      'auth_disbursement_date': new FormControl(''),
      'repayment_date': new FormControl(''),
      'selfChecked': new FormControl(false, { validators: [] }),
      'financierChecked': new FormControl(false, { validators: [] }),
    })
  }
authorizeSelectedInvoiceSubmitForm(){
   if(this.authorize == 'SELF'){
        this.authorizeSelectedInvoice?.get('authtotalamount')?.setValidators(null);
        this.authorizeSelectedInvoice?.get('tenure')?.setValidators(null);
        this.authorizeSelectedInvoice?.get('auth_disbursement_date')?.setValidators(null);        
        this.authorizeSelectedInvoice?.get('repayment_date')?.setValidators(null);        
      }else{

        this.authorizeSelectedInvoice?.get('authtotalamount')?.setValidators([Validators.required]);
        this.authorizeSelectedInvoice?.get('tenure')?.setValidators([Validators.required]);
        this.authorizeSelectedInvoice?.get('auth_disbursement_date')?.setValidators([Validators.required]);        
        this.authorizeSelectedInvoice?.get('repayment_date')?.setValidators([Validators.required]);   
      }
      this.authorizeSelectedInvoice?.get('authtotalamount')?.updateValueAndValidity();
      this.authorizeSelectedInvoice?.get('tenure')?.updateValueAndValidity();
      this.authorizeSelectedInvoice?.get('auth_disbursement_date')?.updateValueAndValidity();   
      this.authorizeSelectedInvoice?.get('repayment_date')?.updateValueAndValidity();   

    this.authorizeSelectedInvoiceSubmitAttempt = true;
    if (this.authorizeSelectedInvoice.valid) {    
      this.authorizeSelectedInvoiceSubmitAttempt = false;
      this.authorizeSelectedInvoice.reset(); 
       this.incomeService.authorizationInvoice(this.authorize, this.invoiceDetails?.id)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.authorizeSelectedInvoiceSubmitAttempt = false;
            this.authorizeSelectedInvoice.reset();
            this.visible3 = false;
            this.successFullPopup = true;
            this.selectedInvoices = [];
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }
}

viewDiscount(invoice: any) {
  this.visible2 = true;
  let invoiceId = invoice?.id;
  this.selectedInvoices = []; 
  this.selectedInvoices.push(invoiceId); // Extracting only the IDs of selected invoices
  this.applyDiscountSelectedInvoice.reset();
   this.applyDiscountSelectedInvoice.patchValue({
        totalamount: invoice?.invoice_amount,
        totalfundBy: this.fundBy.filter((input:any) => input.value == invoice?.fund_by)[0] || null
      });
}

discountKeyUp(){
   const totalAmount = parseFloat(this.applyDiscountSelectedInvoice.get('totalamount')?.value) || 0;
      const discount = parseFloat(this.applyDiscountSelectedInvoice.get('totaldiscount')?.value) || 0;
      const discountedAmount = (totalAmount * discount) / 100;
      const amountAfterDiscount = totalAmount - discountedAmount;

      this.applyDiscountSelectedInvoice.patchValue({
        totaldiscountedamount: discountedAmount.toFixed(2),
        amountafterdiscount: amountAfterDiscount.toFixed(2)
      });
}
}
