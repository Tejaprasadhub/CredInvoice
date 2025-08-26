import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { Subject, takeUntil } from 'rxjs';
import { SellerService } from '../../@shared/services/seller.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-invoices',
  standalone: false,
  templateUrl: './seller-invoices.component.html',
  styleUrl: './seller-invoices.component.scss'
})
export class SellerInvoicesComponent {
  private ngUnsubscribe = new Subject();
  first = 0;
  rows = 10;
  invoices: any[]=[];
  buyers: any[] = [
  ]
selectedBuyers:any[]=[];
  visible:boolean=false;
  selectedinvoice!: any;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private incomeService: InvoiceService,private sellerService: SellerService,private fb: FormBuilder,
    private invoiceService: InvoiceService,private router: Router
  ) {}

  ngOnInit(){
    this.getInvoices();
    this.getBuyers();
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


  getBuyerName(invoice: any) {
    return this.buyers.find(buyer => buyer.value === invoice?.buyer_id)?.label || '';
  }
  getSelectedBuyerName(buyer: any) {
    return this.buyers.find(b => b.value === buyer)?.label || '';
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

openQuickView(invoice: any) {
    // Logic to open a quick view modal or navigate to a detailed view
    this.visible = true;
    this.selectedinvoice = invoice;
  }

  
   getPanNumber(invoiceDetails: any) {
    return this.buyers.find(buyer => buyer.value === invoiceDetails?.buyer_id)?.pan || '';
  }


  viewselectedinvoice(invoice: any) {
    // Navigate to the invoice details page or open a modal with invoice details
    // For example, you can use Angular Router to navigate to the details page
    this.router.navigate(['/home/invoice-details', invoice.id]);
  }


}
