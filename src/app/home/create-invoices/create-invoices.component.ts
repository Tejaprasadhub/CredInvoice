import { Component } from '@angular/core';

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
}
