import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateCardComponent } from './customer-estimate-card.component';

describe('CustomerEstimateCardComponent', () => {
  let component: CustomerEstimateCardComponent;
  let fixture: ComponentFixture<CustomerEstimateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEstimateCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEstimateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
