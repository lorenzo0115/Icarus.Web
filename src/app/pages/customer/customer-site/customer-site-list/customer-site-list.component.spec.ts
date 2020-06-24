import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteListComponent } from './customer-site-list.component';

describe('CustomerSiteListComponent', () => {
  let component: CustomerSiteListComponent;
  let fixture: ComponentFixture<CustomerSiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
