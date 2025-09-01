import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InoviceBidsComponent } from './inovice-bids.component';

describe('InoviceBidsComponent', () => {
  let component: InoviceBidsComponent;
  let fixture: ComponentFixture<InoviceBidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InoviceBidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InoviceBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
