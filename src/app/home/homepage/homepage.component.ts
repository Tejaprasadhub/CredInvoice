import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

interface Step {
  title: string;
  description: string;
}

interface BenefitPoint {
  icon: string;
  heading: string;
  text: string;
}

interface BenefitData {
  title: string;
  points: BenefitPoint[];
  chart?: boolean;
}

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  stepsData: Step[] = [
    { title: '1. Buyer Uploads Invoice', description: 'Buyers initiate the process by uploading an invoice, specifying a proposed discount offer and a new, earlier due date to the seller.' },
    { title: '2. Seller Accepts/Negotiates', description: 'The seller reviews the discount offer. They have the option to accept it for quick access to funds or to negotiate the terms directly on the platform.' },
    { title: '3. Buyer Chooses Funding', description: 'Once an agreement is reached, the buyer decides whether to fund the discounted invoice from their own accounts or to forward it to our network of financiers.' },
    { title: '4. Financiers Bid', description: 'If forwarded, financiers view the vetted invoice and place competitive bids, offering funding with interest rates based on their risk appetite.' },
    { title: '5. Buyer Selects Best Bid', description: 'The buyer reviews bids and selects the most favorable financing option. The invoice remains in the bidding module for 2 days, ensuring a swift decision.' },
    { title: '6. Funds Disbursed & Paid', description: 'The selected financier releases funds to the seller. Subsequently, on the original due date, the buyer remits payment to the financier.' }
  ];

   whyUsPoints: any[] = [
    {
      icon: '🛡️',
      title: 'Unrivaled Security',
      description: 'Secure authentication, data encryption, and comprehensive audit logs protect every transaction.'
    },
    {
      icon: '✅',
      title: 'Rigorous Compliance',
      description: 'Strict KYC verification and adherence to financial regulations ensures a legitimate and trusted ecosystem.'
    },
    {
      icon: '💡',
      title: 'Intuitive Experience',
      description: 'Streamlined dashboards and simple workflows make invoice discounting accessible to everyone.'
    },
    {
      icon: '🔍',
      title: 'Complete Transparency',
      description: 'Gain full visibility with real-time notifications, versioned history, and detailed financial reports.'
    }
  ];

  activeStepIndex = 0;

  tabs = ['seller', 'buyer', 'financier'];
  activeTab = 'seller';

  benefitsData: Record<string, BenefitData> = {
    seller: {
      title: 'Accelerate Your Cash Flow',
      points: [
        { icon: '💸', heading: 'Rapid Fund Disbursal', text: 'Unlock working capital instantly. Receive funds much faster than traditional payment terms allow, improving liquidity to fuel business growth.' },
        { icon: '🤝', heading: 'Flexible Discount Acceptance', text: 'You have full control. Review and either accept or reject discount offers directly from your intuitive dashboard.' },
        { icon: '🔔', heading: 'Real-time Notifications', text: 'Stay informed every step of the way with instant updates on transaction statuses, negotiations, and fund disbursals.' }
      ]
    },
    buyer: {
      title: 'Optimize Your Working Capital & Unlock Savings',
      points: [
        { icon: '💰', heading: 'Strategic Early Payment Discounts', text: 'Transform your accounts payables into profit centers. Enable significant cost savings by offering custom discount terms.' },
        { icon: '🔗', heading: 'Seamless ERP Integration', text: 'Our system automatically modifies payable records within your ERP, streamlining operations and ensuring accurate accounting.' },
        { icon: '🏆', heading: 'Competitive Bidding Module', text: 'Access a network of financiers who compete to fund your invoices, ensuring you receive the most favorable interest rates.' }
      ],
      chart: true
    },
    financier: {
      title: 'Discover Vetted Investment Opportunities',
      points: [
        { icon: '📈', heading: 'Curated Invoice Marketplace', text: 'Access a diverse pool of high-quality, short-term investment opportunities from credible buyers to diversify your portfolio.' },
        { icon: '🎯', heading: 'Risk-Based Bidding', text: 'Place competitive offers with interest rates determined by your own risk appetite, maximizing returns through informed decisions.' },
        { icon: '📊', heading: 'Performance Insights', text: 'Utilize data-driven insights on bidding success and funding performance to continuously optimize your investment strategy.' }
      ]
    }
  };

  buyerChart: Chart | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    // Render chart if buyer tab is default
    if (this.activeTab === 'buyer') {
      this.renderBuyerChart();
    }
  }

  // Steps click
  selectStep(index: number) {
    this.activeStepIndex = index;
  }

  // Tabs click
  selectTab(tab: string) {
    this.activeTab = tab;

    if (tab === 'buyer') {
      setTimeout(() => this.renderBuyerChart(), 0);
    }
  }

  // Render buyer chart
  renderBuyerChart() {
    const ctx = (document.getElementById('buyerChart') as HTMLCanvasElement)?.getContext('2d');
    if (!ctx) return;

    if (this.buyerChart) this.buyerChart.destroy();

    this.buyerChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Potential Savings (in thousands)',
          data: [120, 190, 150, 210],
          backgroundColor: 'rgba(105, 134, 176, 0.6)',
          borderColor: 'rgba(105, 134, 176, 1)',
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` Savings: $${context.parsed.y}k`
            }
          }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Savings ($ thousands)' } },
          x: { title: { display: true, text: 'Quarter' } }
        }
      }
    });
  }
}
