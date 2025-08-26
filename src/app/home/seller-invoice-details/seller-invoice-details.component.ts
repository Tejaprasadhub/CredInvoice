import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { SellerService } from '../../@shared/services/seller.service';

@Component({
  selector: 'app-seller-invoice-details',
  standalone: false,
  templateUrl: './seller-invoice-details.component.html',
  styleUrl: './seller-invoice-details.component.scss'
})
export class SellerInvoiceDetailsComponent {
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
  products: any[]=[];
  first = 0;
  rows = 5;

  acceptVisible:boolean = false;
  rejectVisible:boolean = false;
  reasonForRejectingValue: string = '';
  isDiscountAccepted: boolean = false;
  currentRole:string="";

  ngOnInit(){   
   this.route.params.subscribe((params: any) => {
      this.getInvoiceDetails(params['id']);
 this.currentRole = sessionStorage.getItem('role')?.toLowerCase() || '';
      if(this.currentRole === 'buyer') {
           this.getSellers();
      }else{
            this.getBuyers();
      }    });
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

acceptWithDiscount(invoiceDetails: any) {
  this.incomeService.acceptWithDiscount(invoiceDetails.id)
    .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
      if(result.status) {
        this.isDiscountAccepted = true;
        this.acceptVisible = false;
        this.router.navigate(['/home/seller-invoices'], { replaceUrl: true });
      }
    });
}

RejectWithReason(invoiceDetails: any) {
  this.incomeService.rejectWithReasoning(invoiceDetails.id, this.reasonForRejectingValue)
    .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
      if(result.status) {
        this.rejectVisible = false;
        this.router.navigate(['/home/seller-invoices'], { replaceUrl: true });
      }
    });
}

getSellers() {
    this.sellerService.getSellersList()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
        if(result.data?.length > 0) {
          result?.data.forEach((seller: any) => {
            this.sellers.push({
              label: seller.first_name + ' ' + seller.last_name,
              value: seller.id,
              pan: seller.pan_number
              })
              });
        }else {
          this.sellers= [];
        }
      })
  }

constructor(private route: ActivatedRoute,private messageService: MessageService,
  private incomeService: InvoiceService,private sellerService: SellerService,
   private router: Router
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
}
