import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycShellComponent } from './kyc-shell.component';

describe('KycShellComponent', () => {
  let component: KycShellComponent;
  let fixture: ComponentFixture<KycShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
