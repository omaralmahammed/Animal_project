import { TestBed } from '@angular/core/testing';

import { HadeelService } from './hadeel.service';

describe('HadeelService', () => {
  let service: HadeelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HadeelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
