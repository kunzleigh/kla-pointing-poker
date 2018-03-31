import { TestBed, inject } from '@angular/core/testing';

import { StagedUsersService } from './staged-users.service';

describe('StagedUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StagedUsersService]
    });
  });

  it('should be created', inject([StagedUsersService], (service: StagedUsersService) => {
    expect(service).toBeTruthy();
  }));
});
