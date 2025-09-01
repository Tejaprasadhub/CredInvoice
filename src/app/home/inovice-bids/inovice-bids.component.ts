import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { InvoiceService } from '../../@shared/services/invoice.service';

@Component({
  selector: 'app-inovice-bids',
  standalone: false,
  templateUrl: './inovice-bids.component.html',
  styleUrl: './inovice-bids.component.scss'
})
export class InoviceBidsComponent {
    first = 0;
    private ngUnsubscribe = new Subject();
  bidsList: any[] = []; 
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
   private fb: FormBuilder,
    private invoiceService: InvoiceService,private router: Router,private route: ActivatedRoute
  ) {}

 ngOnInit(){
   this.route.params.subscribe((params: any) => {
      this.getInvoiceBids(params['id']);     
    });
  }

   getInvoiceBids(invoiceId:any) {
        this.invoiceService.getInvoiceBids(invoiceId)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            if(result.data?.length > 0) {
             this.bidsList = result.data;
            }else {
              this.bidsList= [];
            }
          })
    }

    acceptBid(invoice: any) {
      this.invoiceService.acceptBid(invoice)
          .pipe(takeUntil(this.ngUnsubscribe)).subscribe((result: any) => {
            if(result && result.status) {
              this.getInvoiceBids(invoice.invoice_id);
            }
          })
    }

}
