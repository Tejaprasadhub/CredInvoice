import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvoiceService } from '../../@shared/services/invoice.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { SellerService } from '../../@shared/services/seller.service';

@Component({
  selector: 'app-invoice-details',
  standalone: false,
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent {
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
  currentRole:string="";
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
  private incomeService: InvoiceService,private sellerService: SellerService
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
