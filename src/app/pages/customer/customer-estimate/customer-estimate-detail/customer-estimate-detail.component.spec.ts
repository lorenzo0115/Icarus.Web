import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateDetailComponent } from './customer-estimate-detail.component';

describe('CustomerEstimateDetailComponent', () => {
  let component: CustomerEstimateDetailComponent;
  let fixture: ComponentFixture<CustomerEstimateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEstimateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEstimateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
