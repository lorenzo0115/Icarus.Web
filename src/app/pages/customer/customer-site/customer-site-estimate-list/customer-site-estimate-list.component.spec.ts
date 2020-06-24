import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteEstimateListComponent } from './customer-site-estimate-list.component';

describe('CustomerSiteEstimateListComponent', () => {
  let component: CustomerSiteEstimateListComponent;
  let fixture: ComponentFixture<CustomerSiteEstimateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteEstimateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteEstimateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
