import { TestBed } from '@angular/core/testing';

import { RaneemService } from './raneem.service';

describe('RaneemService', () => {
  let service: RaneemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaneemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
