import { TestBed } from '@angular/core/testing';

import { RahafService } from './rahaf.service';

describe('RahafService', () => {
  let service: RahafService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RahafService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
