import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateListComponent } from './customer-estimate-list.component';

describe('CustomerEstimateListComponent', () => {
  let component: CustomerEstimateListComponent;
  let fixture: ComponentFixture<CustomerEstimateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEstimateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEstimateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
