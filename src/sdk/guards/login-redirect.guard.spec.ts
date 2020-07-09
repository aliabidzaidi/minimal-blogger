import { TestBed } from '@angular/core/testing';

import { LoginRedirectGuard } from './login-redirect.guard';

describe('LoginRedirectGuard', () => {
  let guard: LoginRedirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginRedirectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
