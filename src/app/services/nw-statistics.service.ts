import { Injectable, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NwStatisticsService {
  public totalNumberOfChangeDetectionCycles: number = 0;
  readonly statisticsReset$ = new Subject<void>();

  constructor() { }

  resetStatistics(): void {
    this.statisticsReset$.next();
    this.totalNumberOfChangeDetectionCycles = 0;
  }

  incrementTotalCount(): void {
    this.totalNumberOfChangeDetectionCycles++;
  }
}
