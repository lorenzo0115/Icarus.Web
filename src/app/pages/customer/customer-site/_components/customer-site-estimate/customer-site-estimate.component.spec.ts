import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteEstimateComponent } from './customer-site-estimate.component';

describe('CustomerSiteEstimateComponent', () => {
  let component: CustomerSiteEstimateComponent;
  let fixture: ComponentFixture<CustomerSiteEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
