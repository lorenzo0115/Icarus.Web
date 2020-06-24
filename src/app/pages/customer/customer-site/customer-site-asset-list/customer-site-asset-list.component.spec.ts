import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSiteAssetListComponent } from './customer-site-asset-list.component';

describe('CustomerSiteAssetListComponent', () => {
  let component: CustomerSiteAssetListComponent;
  let fixture: ComponentFixture<CustomerSiteAssetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSiteAssetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSiteAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
