import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerInvoiceDetailsComponent } from './seller-invoice-details.component';

describe('SellerInvoiceDetailsComponent', () => {
  let component: SellerInvoiceDetailsComponent;
  let fixture: ComponentFixture<SellerInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerInvoiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
