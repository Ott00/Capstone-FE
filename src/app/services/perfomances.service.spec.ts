import { TestBed } from '@angular/core/testing';

import { PerfomancesService } from './performances.service';

describe('PerfomancesService', () => {
  let service: PerfomancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfomancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
