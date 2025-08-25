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
  applyDiscountSelectedFormSubmitAttempt: boolean=false;
    private ngUnsubscribe = new Subject();
   selectedInvoices: any[]=[];
  cities: any[] =[];
  selectedCity: any;
  first = 0;
  rows = 10;
  invoices: any[]=[];
  sellers: any[] = [
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
  }

   applyDiscountOnSelectedInvoicesForm() {
    this.applyDiscountSelectedForm = this.fb.group({
      'discount': new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] }),
      'disbursementDate': new FormControl('', { validators: [Validators.required] }),
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


  getSellerName(invoice: any) {
    return this.sellers.find(seller => seller.value === invoice?.seller_id)?.label || '';
  }
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
