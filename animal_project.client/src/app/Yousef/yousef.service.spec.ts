import { TestBed } from '@angular/core/testing';

import { YousefService } from './yousef.service';

describe('YousefService', () => {
  let service: YousefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YousefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
