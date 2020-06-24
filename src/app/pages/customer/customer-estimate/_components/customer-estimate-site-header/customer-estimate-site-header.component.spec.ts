import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEstimateSiteHeaderComponent } from './customer-estimate-site-header.component';

describe('CustomerEstimateSiteHeaderComponent', () => {
  let component: CustomerEstimateSiteHeaderComponent;
  let fixture: ComponentFixture<CustomerEstimateSiteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEstimateSiteHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEstimateSiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
