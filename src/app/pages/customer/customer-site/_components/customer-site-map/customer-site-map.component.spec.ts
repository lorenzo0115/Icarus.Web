import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteMapComponent } from './customer-site-map.component';

describe('CustomerSiteMapComponent', () => {
  let component: CustomerSiteMapComponent;
  let fixture: ComponentFixture<CustomerSiteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
