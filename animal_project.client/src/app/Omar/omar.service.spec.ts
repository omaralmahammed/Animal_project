import { TestBed } from '@angular/core/testing';

import { OmarService } from './omar.service';

describe('OmarService', () => {
  let service: OmarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
