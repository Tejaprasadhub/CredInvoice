import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-invoice',
  standalone: false,
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent {
  cities: any[] =[];
  selectedCity: any;
  date1:any;
  uploadedFiles: any[] = [];
  ngOnInit(){
    this.cities = [
      { name: 'Select Seller', code: '' },
      { name: 'Alpha Traders', code: 'NY' },
      { name: 'Bravo Mart', code: 'RM' },
      { name: 'Charlie Supplies', code: 'LDN' },
      { name: 'Delta Grocers', code: 'IST' }
  ];
}


constructor(private messageService: MessageService) {}

onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
}
