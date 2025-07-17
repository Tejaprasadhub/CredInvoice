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
  sellers: any[] = [
  ]
  visible:boolean=false;
  selectedinvoice!: any;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private incomeService: InvoiceService,private sellerService: SellerService,private fb: FormBuilder,
    private invoiceService: InvoiceService,private router: Router
  ) {}

  ngOnInit(){
    this.getInvoices();
    this.getSellers();
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

openQuickView(invoice: any) {
    // Logic to open a quick view modal or navigate to a detailed view
    this.visible = true;
    this.selectedinvoice = invoice;
  }

  
   getPanNumber(invoiceDetails: any) {
    return this.sellers.find(seller => seller.value === invoiceDetails?.seller_id)?.pan || '';
  }


  viewselectedinvoice(invoice: any) {
    // Navigate to the invoice details page or open a modal with invoice details
    // For example, you can use Angular Router to navigate to the details page
    this.router.navigate(['/home/invoice-details', invoice.id]);
  }


}
