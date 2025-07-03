import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SellerService } from '../../@shared/services/seller.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { AuthService } from '../../@shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../../@shared/services/invoice.service';

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

  fundBy: any[] = [
    { label: 'Self', value: 'SELF' },
    { label: 'Financier', value: 'FINANCIER' }
  ]
  date1: any;
  uploadedFiles: any[] = [];
  visible: boolean = false;
  first = 0;
  rows = 5;
  totalRecords: number = 0;
  ngOnInit() {
    this.totalRecords = this.itemsList.length;
    this.getSellers();
    this.createInvoiceForm();
    this.createItemForm();
  }

  
  createInvoiceForm() {
    this.invoiceForm = this.fb.group({
      'invoiceseller': new FormControl('', { validators: [Validators.required] }),
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
    private fb: FormBuilder
  ) { }

  getSellers() {
    this.sellerService.getSellersList()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if(result.data?.length > 0) {
          result?.data.forEach((seller: any) => {
            this.sellers.push({
              label: seller.first_name + ' ' + seller.last_name,
              value: seller.id
              })
              });
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
  }

  invoiceFormFormSubmit(){
    this.invoiceFormSubmitAttempt = true;    
    if (this.invoiceForm.valid && this.itemsList.length > 0) {
      this.invoiceFormSubmitAttempt = false;
      this.invoiceService.createInovice(this.invoiceForm.value, this.itemsList)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.invoiceForm.reset();
            this.itemsList = [];
            this.invoiceFormSubmitAttempt = false;
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }
  }
  itemFormSubmit(){
  this.itemFormSubmitAttempt = true;    
  if (this.itemForm.valid) {
    console.log(this.itemForm.value);
    this.itemFormSubmitAttempt = false;
    this.itemsList.push(this.itemForm.value);
    this.itemForm.reset();
    this.visible = false;
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
closePopup() {
  this.visible = false;
  this.itemForm.reset();
  this.itemFormSubmitAttempt = false;
}
}



