import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteCardComponent } from './customer-site-card.component';

describe('CustomerSiteCardComponent', () => {
  let component: CustomerSiteCardComponent;
  let fixture: ComponentFixture<CustomerSiteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
