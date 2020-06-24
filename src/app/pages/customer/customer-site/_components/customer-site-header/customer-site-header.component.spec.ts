import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteHeaderComponent } from './customer-site-header.component';

describe('CustomerSiteHeaderComponent', () => {
  let component: CustomerSiteHeaderComponent;
  let fixture: ComponentFixture<CustomerSiteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
