import { TestBed } from '@angular/core/testing';

import { TremanService } from './treman.service';

describe('TremanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TremanService = TestBed.get(TremanService);
    expect(service).toBeTruthy();
  });
});
