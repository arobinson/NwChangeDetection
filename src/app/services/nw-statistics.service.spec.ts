import { TestBed } from '@angular/core/testing';

import { NwStatisticsService } from './nw-statistics.service';

describe('NwStatisticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NwStatisticsService = TestBed.get(NwStatisticsService);
    expect(service).toBeTruthy();
  });
});
