import { TestBed } from '@angular/core/testing';

import { SuhaService } from './suha.service';

describe('SuhaService', () => {
  let service: SuhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
