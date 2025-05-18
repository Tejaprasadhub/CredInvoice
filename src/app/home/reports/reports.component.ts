import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  cities: any[] =[];
  selectedCity: any;
  selectedTime:any;
  selectedStatus:any;
  first = 0;
  rows = 10;
  products: any[]=[];
  selectedProducts!: any;
  visible:boolean=false;
  visible1:boolean=false;
  visible2:boolean=false;
  visible3:boolean=false;
  visible4:boolean=false;
  date1:any;

  statusDropDown:any[]=[];
  times:any[]=[];
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit(){
    this.cities = [
      { name: 'Select Seller', code: '' },
      { name: 'Alpha Traders', code: 'NY' },
      { name: 'Bravo Mart', code: 'RM' },
      { name: 'Charlie Supplies', code: 'LDN' },
      { name: 'Delta Grocers', code: 'IST' }
  ];
  this.statusDropDown = [
    { name: 'All Payments', code: '' },
    { name: 'Alpha Traders', code: 'NY' },
    { name: 'Bravo Mart', code: 'RM' },
    { name: 'Charlie Supplies', code: 'LDN' },
    { name: 'Delta Grocers', code: 'IST' }
];

this.times =[
  { name: 'All Time', code: '' },
  { name: 'Alpha Traders', code: 'NY' },
  { name: 'Bravo Mart', code: 'RM' },
  { name: 'Charlie Supplies', code: 'LDN' },
  { name: 'Delta Grocers', code: 'IST' }
]
this.products=[
  {
    code:"1",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"approve",
    status:"Completed"
  },{
    code:"2",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",      
    statusId:"sent",
    status:"Upcoming"
  },{
    code:"3",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"approve",
    status:"Completed"
  },{
    code:"1236",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"approve",
    status:"Completed"
  },{
    code:"1236",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"reject",
    status:"Expired"
  },{
    code:"1236",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"approve",
    status:"Completed"
  },{
    code:"1236",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"approve",
    status:"Completed"
  },{
    code:"1236",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"reject",
    status:"Expired"
  },{
    code:"1236",
    name:"7896",
    category:"1258",
    quantity:"9632",
    invoice:"invoice1.pdf",
    statusId:"reject",
    status:"Expired"
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
}
