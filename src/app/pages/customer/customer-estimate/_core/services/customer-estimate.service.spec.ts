import { TestBed } from '@angular/core/testing';

import { CustomerEstimateService } from './customer-estimate.service';

describe('CustomerEstimateService', () => {
  let service: CustomerEstimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerEstimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
