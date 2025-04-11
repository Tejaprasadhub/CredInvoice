import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-invoices',
  standalone: false,
  templateUrl: './create-invoices.component.html',
  styleUrl: './create-invoices.component.scss'
})
export class CreateInvoicesComponent {
  cities: any[] =[];
  selectedCity: any;
  first = 0;
  rows = 10;
  products: any[]=[];
  selectedProducts!: any;
  visible:boolean=false;
  visible1:boolean=false;
  visible2:boolean=false;
  date1:any;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit(){
    this.cities = [
      { name: 'Select Seller', code: '' },
      { name: 'Alpha Traders', code: 'NY' },
      { name: 'Bravo Mart', code: 'RM' },
      { name: 'Charlie Supplies', code: 'LDN' },
      { name: 'Delta Grocers', code: 'IST' }
  ];
  this.products=[
    {
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
