import { TestBed } from '@angular/core/testing';

import { LiveViewService } from './live-view.service';

describe('LiveViewService', () => {
  let service: LiveViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
