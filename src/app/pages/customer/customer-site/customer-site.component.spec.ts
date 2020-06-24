import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteComponent } from './customer-site.component';

describe('CustomerSiteComponent', () => {
  let component: CustomerSiteComponent;
  let fixture: ComponentFixture<CustomerSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
