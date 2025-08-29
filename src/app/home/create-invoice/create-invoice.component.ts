import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SellerService } from '../../@shared/services/seller.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../@shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  standalone: false,
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent {
  private ngUnsubscribe = new Subject();
  invoiceForm!: FormGroup;
  itemForm!: FormGroup;
  invoiceFormSubmitAttempt: boolean=false;
  itemFormSubmitAttempt: boolean=false;
  itemsList:any[]=[];
  sellers: any[] = [
  ]
invoiceDetails:any;
  fundBy: any[] = [
    { label: 'Self', value: 'SELF' },
    { label: 'Financier', value: 'FINANCIER' }
  ]
  date1: any;
  minDisbursementDate!: Date;
  uploadedFiles: any[] = [];
  visible: boolean = false;
  first = 0;
  rows = 5;
  totalRecords: number = 0;
  invoiceId: string = '';
  ngOnInit() {
    this.totalRecords = this.itemsList.length;
    this.getSellers();
    this.createInvoiceForm();
    this.createItemForm();
     this.route.params.subscribe((params: any) => {
      this.invoiceId = params['id'];
       if (this.invoiceId) {  
          // Fetch invoice details and populate the form for editing
          this.getInvoiceDetails(params['id']);
       }      
      });
  }

  getInvoiceDetails(id:string) {
  this.incomeService.getInvoiceDetails(id)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            if(result.status) {
             this.invoiceDetails = result.data;
              this.invoiceForm.patchValue({
                invoiceseller: this.sellers.filter(obj => obj.value == this.invoiceDetails.seller_id)[0],
                number: this.invoiceDetails.invoice_number,
                amount: this.invoiceDetails.invoice_amount,
                invoiceDate: new Date(this.invoiceDetails.invoice_date),
                disbursementDate: new Date(this.invoiceDetails.invoice_due_date),
                fundBy:this.fundBy.filter(obj => obj.value == this.invoiceDetails.fund_by)[0],
                description: this.invoiceDetails.goods_description                
              });
              this.itemsList = this.invoiceDetails.items || [];
              this.totalRecords = this.itemsList.length;
            }
          })
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

  
  createInvoiceForm() {
    this.invoiceForm = this.fb.group({
      'invoiceseller': new FormControl(null, { validators: [Validators.required] }),
      'number': new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9-]*$')] }),
      'amount': new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] }),
      'invoiceDate': new FormControl('', { validators: [Validators.required] }),
      'disbursementDate': new FormControl('', { validators: [Validators.required] }),
      'fundBy': new FormControl('', { validators: [Validators.required] }),
      'description': new FormControl('', { validators: [Validators.required] })
    })
  }

  createItemForm() {
    this.itemForm = this.fb.group({
      'item_number': new FormControl('', { validators: [Validators.required,Validators.pattern('^[a-zA-Z0-9-]*$')] }),
      'item_name': new FormControl('', { validators: [Validators.required,Validators.pattern('^[a-z A-Z0-9]*$')] }),
      'unit_price': new FormControl('', { validators: [Validators.required,Validators.pattern('^[0-9]*$')] }),
      'quantity': new FormControl('', { validators: [Validators.required,Validators.pattern('^[0-9]*$')] }),
      'total_amount': new FormControl('', { validators: [Validators.required] })
    })
    this.calculateTotal();
  }

    calculateTotal() {
    this.itemForm.get('quantity')?.valueChanges.subscribe(() => this.updateTotal());
    this.itemForm.get('unit_price')?.valueChanges.subscribe(() => this.updateTotal());
  }

  updateTotal() {
    const quantity = this.itemForm.get('quantity')?.value || 0;
    const price = this.itemForm.get('unit_price')?.value || 0;
    const total = quantity * price;

    this.itemForm.get('total_amount')?.setValue(total, { emitEvent: false });
  }


  constructor(private messageService: MessageService,
    private sellerService: SellerService,
    private authService:AuthService,
    private invoiceService:InvoiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
     private incomeService: InvoiceService,
     private router: Router
  ) { }

  getSellers() {
    this.sellerService.getSellersList()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if(result.data?.length > 0) {
           this.sellers = result.data.map((seller: any) => ({
          label: seller.first_name,
          value: seller.id
        }));
        }else {
          this.sellers= [];
        }
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

  invoiceFormFormSubmit(){
    this.invoiceFormSubmitAttempt = true;    
    if (this.invoiceForm.valid && !this.invoiceId && this.uploadedFiles.length > 0) {      
      this.invoiceService.createInovice(this.uploadedFiles[0],this.invoiceForm.value, this.itemsList)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.invoiceFormSubmitAttempt = false;
            this.invoiceForm.reset();
            this.uploadedFiles = [];
            this.itemsList = [];
            this.invoiceFormSubmitAttempt = false;
            this.router.navigate(['/home/invoices']);

            // this.router.navigate(['/home/create-invoices'], { replaceUrl: true });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }else if (this.invoiceForm.valid && this.invoiceId) {
      // if(this.uploadedFiles.length == 0){
      //    const file = this.base64ToFile(this.invoiceDetails?.invoice_pdf, "invoice.pdf", "application/pdf");
      //   this.uploadedFiles.push(file);
      // }     

      this.invoiceService.updateInovice(this.uploadedFiles[0],this.invoiceForm.value, this.itemsList,this.invoiceId)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.invoiceFormSubmitAttempt = false;
            this.invoiceForm.reset();
            this.uploadedFiles = [];
            this.itemsList = [];
            this.invoiceFormSubmitAttempt = false;
            this.router.navigate(['/home/invoices']);
            // this.router.navigate(['/home/create-invoices'], { replaceUrl: true });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }
  }

  base64ToFile(base64: string, filename: string, mimeType: string): File {
  const byteString = atob(base64);
  const byteNumbers = new Array(byteString.length).fill(0).map((_, i) => byteString.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], filename, { type: mimeType });
}

  itemFormSubmit(){
  this.itemFormSubmitAttempt = true;    
  if (this.itemForm.valid) {
    this.itemFormSubmitAttempt = false;
    this.itemsList.push(this.itemForm.value);
    this.itemForm.reset();
    this.visible = false;
    this.totalRecords = this.itemsList.length;
  }
}

edit(item:any) {
  this.itemForm.patchValue({
    item_number: item.item_number,
    item_name: item.item_name,
    unit_price: item.unit_price,
    quantity: item.quantity,
    total_amount: item.total_amount
  });
  this.visible = true;
}

delete(item:any){
  this.itemsList = this.itemsList.filter(i => i !== item);
  this.totalRecords = this.itemsList.length;
}
closePopup() {
  this.visible = false;
  this.itemForm.reset();
  this.itemFormSubmitAttempt = false;
}

 // Function that triggers on the selection of createDate
  onCreateDateChange(event: any) {
    
    const selectedCreateDate = event;

    if (selectedCreateDate) {
      // Set min and max disbursement date based on the createDate
      this.minDisbursementDate = new Date(selectedCreateDate);
      
      // You can also add custom logic to control the disbursement date range.
      // For example, disable dates that are before or after a certain range.

      this.minDisbursementDate.setDate(this.minDisbursementDate.getDate() + 1);  // Disable create date itself
      this.invoiceForm.get('disbursementDate')?.setValue(null); // Reset disbursement date
    }
  }


  onSellerChange(event: any) {
  console.log('Selected seller ID:', event.value);
  const selectedSeller = this.sellers.find(s => s.value === event.value);
  console.log('Selected Seller Object:', selectedSeller);
  // No patchValue needed — form is already updated
}


}



