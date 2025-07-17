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
  ngOnInit(){   
   this.route.params.subscribe((params: any) => {
      this.getInvoiceDetails(params['id']);
      this.getSellers();
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
   getPanNumber(invoiceDetails: any) {
    return this.sellers.find(seller => seller.value === invoiceDetails?.seller_id)?.pan || '';
  }
}
