import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { Subject, takeUntil } from 'rxjs';
import { SellerService } from '../../@shared/services/seller.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
   
@Component({
  selector: 'app-create-invoices',
  standalone: false,
  templateUrl: './create-invoices.component.html',
  styleUrl: './create-invoices.component.scss'
})
export class CreateInvoicesComponent {
  applyDiscountSelectedForm!: FormGroup;
  applyDiscountSelectedInvoice!: FormGroup;
  applyDiscountSelectedFormSubmitAttempt: boolean=false;
  applyDiscountSelectedInvoiceSubmitAttempt: boolean=false;
    private ngUnsubscribe = new Subject();
   selectedInvoices: any[]=[];
  cities: any[] =[];
  selectedSellers: any[]=[];
  first = 0;
  rows = 10;
  invoices: any[]=[];
  sellers: any[] = [
  ];
  buyers: any[] = [
  ];
  fundBy: any[] = [
    { label: 'Self', value: 'SELF' },
    { label: 'Financier', value: 'FINANCIER' }
  ]
  selectedinvoices!: any;
  visible:boolean=false;
  visible1:boolean=false;
  visible2:boolean=false;
  visible3:boolean=false;
  visible4:boolean=false;
  date1:any;
  invoiceItems:any[] = [];
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private incomeService: InvoiceService,private sellerService: SellerService,private fb: FormBuilder,
    private invoiceService: InvoiceService,private router: Router
  ) {}

  ngOnInit(){
    this.getInvoices();
    
   this.getSellers();
    this.applyDiscountOnSelectedInvoicesForm();
    this.applyDiscountOnSelectedInvoiceForm();
  }

   applyDiscountOnSelectedInvoicesForm() {
    this.applyDiscountSelectedForm = this.fb.group({
      'discount': new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] }),
      'disbursementDate': new FormControl('', { validators: [Validators.required] }),
    })
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
  getInvoices() {
      this.incomeService.getInvoicesList()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if(result.data?.length > 0) {
           this.invoices = result.data;
          }else {
            this.invoices= [];
          }
        })
  }
applyDiscountSelectedInvoiceSubmit(){
    this.applyDiscountSelectedInvoiceSubmitAttempt = true;
    const selectedInvoiceIds = this.selectedInvoices; // Extracting only the IDs of selected invoices
    if (this.applyDiscountSelectedInvoice.valid) {     
       this.invoiceService.applyDiscountOnInvoice(this.applyDiscountSelectedInvoice.value, selectedInvoiceIds)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.applyDiscountSelectedInvoiceSubmitAttempt = false;
            this.applyDiscountSelectedInvoice.reset();
            this.visible = false;
            this.selectedInvoices = [];
            this.getInvoices();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }
}

viewDiscount(invoice: any) {
  this.visible = true;
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
  applyDiscountSelectedFormSubmit() {
    this.applyDiscountSelectedFormSubmitAttempt = true;
    const selectedInvoiceIds = this.selectedInvoices.map(invoice => invoice.id); // Extracting only the IDs of selected invoices
    if (this.applyDiscountSelectedForm.valid) {
    this.invoiceService.applyDiscountOnInvoices(this.applyDiscountSelectedForm.value, selectedInvoiceIds)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.applyDiscountSelectedFormSubmitAttempt = false;
            this.applyDiscountSelectedForm.reset();
            this.visible1 = false;
            this.selectedInvoices = [];
            this.getInvoices();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }
  }

  sendtoSeller(){
        const selectedInvoiceIds = this.selectedInvoices.map(invoice => invoice.id); // Extracting only the IDs of selected invoices
        this.invoiceService.sendToSeller(selectedInvoiceIds)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
           this.visible3 = false;
            this.visible4 = true;
            this.selectedInvoices = [];
            this.getInvoices();
          // if (result.status) {
          //   this.visible3 = false;
          //   this.visible4 = true;
          //   this.selectedInvoices = [];
          //   this.getInvoices();
          // } else {
          //   this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          // }
        })
  }
 getSelectedSellerName(invoice: any) {
    return this.sellers.find(seller => seller.value === invoice)?.label || '';
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

  getSellerName(invoice: any) {
    return this.sellers.find(seller => seller.value === invoice?.seller_id)?.label || '';
  }
   getSellers() {
    this.sellerService.getSellersList()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if(result.data?.length > 0) {
            this.sellers = result.data.map((seller: any) => ({
               label: seller.first_name + ' ' + seller.last_name,
              value: seller.id
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
          label: buyer.first_name,
          value: buyer.id
        }));
        }else {
          this.buyers= [];
        }
      })
  }

  delete(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm btn-delete',
        accept: () => {
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}

showItems(invoice: any) {
  this.visible2= true;
this.invoiceItems = invoice.items || [];
  if (this.invoiceItems.length === 0) { 
    this.messageService.add({ severity: 'info', summary: 'No Items', detail: 'This invoice has no items.' });
  }
}
getTotalAmount(items: any[]): any {
  let total = 0;
  items.forEach(item => {
    total += item.invoice_amount || 0; // Assuming each item has an 'amount' property
  });
  return total;
}


  transformText(value: number): string {
    if (value === null || value === undefined || value === 0) return '';

    if (value < 1000) {
      return value.toString();
    } else if (value >= 1000 && value < 100000) {
      // Thousands - K
      return '('+(value / 1000).toFixed(1).replace(/\.0$/, '') + 'K)';
    } else if (value >= 100000 && value < 10000000) {
      // Lakhs
      return '('+(value / 100000).toFixed(1).replace(/\.0$/, '') + 'L)';
    } else {
      // Crores
      return '('+(value / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr)';
    }
  }

    applyDiscountOnSelectedInvoices(selectedInvoices: any[]) {
    if (selectedInvoices.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'No Invoices Selected', detail: 'Please select at least one invoice to apply discount.' });
      return;
    }
    this.visible1 = true;
    console.log("Selected Invoices:", selectedInvoices);
  }


  viewInvoiceDetails(invoice: any) {
    // Navigate to the invoice details page or open a modal with invoice details
    // For example, you can use Angular Router to navigate to the details page
    this.router.navigate(['/home/invoice-details', invoice.id]);
  }


  editInvoice(invoice: any) {
    // For example, you can use Angular Router to navigate to the details page
    this.router.navigate(['/home/create-invoice', invoice.id]);
  }




}
