import { TestBed } from '@angular/core/testing';

import { UrlAdminYousefService } from './url-admin-yousef.service';

describe('UrlAdminYousefService', () => {
  let service: UrlAdminYousefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlAdminYousefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
