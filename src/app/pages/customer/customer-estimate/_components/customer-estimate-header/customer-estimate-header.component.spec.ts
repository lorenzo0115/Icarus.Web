import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateHeaderComponent } from './customer-estimate-header.component';

describe('CustomerEstimateHeaderComponent', () => {
  let component: CustomerEstimateHeaderComponent;
  let fixture: ComponentFixture<CustomerEstimateHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEstimateHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEstimateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
