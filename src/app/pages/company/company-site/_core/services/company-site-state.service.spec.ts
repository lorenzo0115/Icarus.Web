import { TestBed } from '@angular/core/testing';

import { CompanySiteStateService } from './company-site-state.service';

describe('CompanySiteStateService', () => {
  let service: CompanySiteStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySiteStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
