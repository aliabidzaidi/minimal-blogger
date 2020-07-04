import { TestBed } from '@angular/core/testing';

import { DbCallerService } from './dbCaller.service';

describe('DbCallerService', () => {
  let service: DbCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
