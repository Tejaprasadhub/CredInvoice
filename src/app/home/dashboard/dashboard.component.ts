import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {  
  constructor(private router: Router){
    
  }
  cities: any[] =[];
  custom: any[] =[];
  date1: Date | undefined;
  selectedCity: any;
  selectedCustom: any;

  data: any;
  options: any;
  data1: any;
  options1: any;
  products:any[]=[]
  ngOnInit() {
   const textColor:string='#000'
        this.data1 = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: ['#3A4A61','#D1D9E7', '#879EC0'],
                    hoverBackgroundColor: ['#3A4A61','#D1D9E7', '#879EC0']
                }
            ]
        };

        this.options1 = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    this.data = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: ['#3A4A61','#D1D9E7', '#879EC0'],
                hoverBackgroundColor: ['#3A4A61','#D1D9E7', '#879EC0']
            }
        ]
    };

    this.options = {
        cutout: '60%',
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        }
    };
  
      this.cities = [
          { name: 'All Sellers', code: '' },
          { name: 'Alpha Traders', code: 'NY' },
          { name: 'Bravo Mart', code: 'RM' },
          { name: 'Charlie Supplies', code: 'LDN' },
          { name: 'Delta Grocers', code: 'IST' }
      ];
      this.custom = [
        { name: 'All Time', code: '' },
        { name: 'This Month', code: 'NY' },
        { name: 'Last Month', code: 'NY' },
        { name: 'Last 6 Months', code: 'RM' },
        { name: 'Last 12 Months', code: 'RM' },
        { name: 'Custom', code: 'LDN' }
    ];

    this.selectedCity = this.cities[0];
    this.selectedCustom = this.custom[5];

    this.products=[
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      },
      {
        image:'dashboard_payment.png'
      }
    ]
  }

  createNewInvoice(){
        this.router.navigate(['/home/create-invoices']);  // define your component where you want to go
  }
}
