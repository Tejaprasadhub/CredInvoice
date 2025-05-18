import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-negotiate',
  standalone: false,
  templateUrl: './negotiate.component.html',
  styleUrl: './negotiate.component.scss'
})
export class NegotiateComponent {
  cities: any[] =[];
  status: any[] =[];
  selectedCity: any;
  selectedStatus: any;
  first = 0;
  rows = 10;
  products: any[]=[];
  selectedProducts!: any;
  visible:boolean=false;
  visible2:boolean=false;
  date1:any;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService,
    private router: Router) {}

  ngOnInit(){
    this.cities = [
      { name: 'Selected Seller', code: '' },
      { name: 'Alpha Traders', code: 'NY' },
      { name: 'Bravo Mart', code: 'RM' },
      { name: 'Charlie Supplies', code: 'LDN' },
      { name: 'Delta Grocers', code: 'IST' }
  ];
  this.status = [
    { name: 'Select Status', code: '' },
    { name: 'Sent to Seller', code: 'NY' },
    { name: 'Accepted by Seller', code: 'RM' },
    { name: 'Rejected by Seller', code: 'LDN' },
    { name: 'Approved by Buyer|Fund by Financier', code: 'IST' },
    { name: 'Approved by Buyer|Fund by Self', code: 'IST' }
];
  this.products=[
    {
      code:"1",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"sent",
      status:"Awaiting Bid Acceptance"
    },{
      code:"2",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",      
      statusId:"accept",
      status:"Accepted Bid"
    },{
      code:"3",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"approve",
      status:"Disbursed by Financier"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"reject",
      status:"Expired without Bid"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"reject",
      status:"Expired Bid"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"sent",
      status:"Awaiting Bid Acceptance"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"accept",
      status:"Accepted Bid"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"reject",
      status:"Expired without Bid"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf",
      statusId:"approve",
      status:"Disbursed by Financier"
    },{
      code:"1",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"2",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"3",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"2",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"3",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    },{
      code:"1236",
      name:"7896",
      category:"1258",
      quantity:"9632",
      invoice:"invoice1.pdf"
    }
  ]
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
