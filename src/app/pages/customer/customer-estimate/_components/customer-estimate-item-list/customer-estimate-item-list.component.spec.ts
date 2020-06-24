import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateItemListComponent } from './customer-estimate-item-list.component';

describe('CustomerEstimateItemListComponent', () => {
  let component: CustomerEstimateItemListComponent;
  let fixture: ComponentFixture<CustomerEstimateItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEstimateItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEstimateItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
