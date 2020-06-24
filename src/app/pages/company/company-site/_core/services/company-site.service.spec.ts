import { TestBed } from '@angular/core/testing';

import { CompanySiteService } from './company-site.service';

describe('CompanySiteService', () => {
  let service: CompanySiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
