import { TestBed } from '@angular/core/testing';

import { NwLoggerService } from './nw-logger.service';

describe('NwLoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NwLoggerService = TestBed.get(NwLoggerService);
    expect(service).toBeTruthy();
  });
});
