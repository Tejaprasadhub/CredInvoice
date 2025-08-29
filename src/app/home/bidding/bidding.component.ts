import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SellerService } from '../../@shared/services/seller.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BiddingService } from '../../@shared/services/bidding.service';

@Component({
  selector: 'app-bidding',
  standalone: false,
  templateUrl: './bidding.component.html',
  styleUrl: './bidding.component.scss'
})
export class BiddingComponent {
    private ngUnsubscribe = new Subject();
  buyers: any[] = [
  ];
  sellers: any[] = [
  ];
  selectedSellers:any[]=[];
  selectedBuyers:any[]=[];
  selectedCity: any;
  selectedStatus: any;
  first = 0;
  rows = 10;
  products: any[]=[];
  selectedProducts!: any;
  visible:boolean=false;
  visible2:boolean=false;
  date1:any;
  invoices: any[]=[];
  selectedInvoices: any[]=[];
  bulkBidSelectedForm!: FormGroup;
  bulkBidSelectedFormSubmitAttempt: boolean=false;
visible1:boolean=false;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router,private sellerService: SellerService,private fb: FormBuilder,
     private invoiceService: InvoiceService,private incomeService: InvoiceService,
    private biddingService : BiddingService) {}

  ngOnInit(){
    this.getBids();
   this.getBuyers();
   this.getSellers();
    this.applyDBiddingOnSelectedInvoicesForm();
  }

  applyDBiddingOnSelectedInvoicesForm() {
    this.bulkBidSelectedForm = this.fb.group({
      'discount': new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$')] })
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

  bulkBidSelectedFormSubmit() {
    this.bulkBidSelectedFormSubmitAttempt = true;
    let bidData: any[] = [];
    this.selectedInvoices.forEach(invoice => {
       let obj:any={};
      obj['invoice_id'] = invoice.id;
      obj['interest_rate'] = this.bulkBidSelectedForm.value.discount;
      obj['bid_amount'] = invoice?.invoice_amount * (1 + (this.bulkBidSelectedForm.value.discount / 100));
      bidData.push(obj);
    });
   // const selectedInvoiceIds = this.selectedInvoices.map(invoice => invoice.id);
     // Extracting only the IDs of selected invoices
    if (this.bulkBidSelectedForm.valid) {
    this.biddingService.PostBids(bidData)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if (result.status) {
            this.bulkBidSelectedFormSubmitAttempt = false;
            this.bulkBidSelectedForm.reset();
            this.visible1 = false;
            this.selectedInvoices = [];
            this.getBids();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: result.message });
          }
        })
    }
  }

  getTotalAmount(items: any[]): any {
  let total = 0;
  items.forEach(item => {
    total += item?.invoice_amount || 0; // Assuming each item has an 'amount' property
  });
  return total;
}

applyDBiddingOnSelectedInvoices(selectedInvoices: any[]) {
    if (selectedInvoices.length === 0) {
      this.messageService.add({ severity: 'warn', summary: 'No Invoices Selected', detail: 'Please select at least one invoice to apply discount.' });
      return;
    }
    this.visible1 = true;
    // this.visible1 = true;
    console.log("Selected Invoices:", selectedInvoices);
  }


  SignleBid(invoice: any) {
    this.selectedInvoices = [invoice];
    this.visible1 = true;
    console.log("Selected Invoice for Single Bid:", invoice);
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

   getBids() {   
      this.biddingService.getBiddingList(this.selectedSellers,this.selectedBuyers)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
          if(result.data?.length > 0) {
           this.invoices = result.data;          
          }else {
            this.invoices= [];
          }
        })
  }

   getSellers() {
    this.sellerService.getFinancierSellersList()
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

  getBuyers() {
      this.sellerService.getFinacierBuyersList()
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
getSelectedBuyerName(buyer: any) {
    return this.buyers.find(b => b.value === buyer)?.label || '';
  }

  getSelectedSellerName(seller: any) {
    return this.sellers.find(b => b.value === seller)?.label || '';
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

invoiceDetais(){
  this.router.navigate(['/home/invoice-details']);  // define your component where you want to go
}
}
