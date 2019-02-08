import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NwStatisticsService {
  public totalNumberOfChangeDetectionCycles: number;

  constructor() { }
}
