import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { bufferTime, filter } from 'rxjs/operators';
import { NwLogMessage } from '../nw-model';

@Injectable({
  providedIn: 'root'
})
export class NwLoggerService implements OnDestroy {
  public readonly logged$ = new BehaviorSubject<Array<NwLogMessage>>([]);
  private readonly handleLogsInBatch = new Subject<NwLogMessage>();
  private onDestroy = new Subject<void>();

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      this.handleLogsInBatch.pipe(bufferTime(500))
        .pipe(filter((logs) => logs.length > 0))
        .subscribe((logs: Array<NwLogMessage>): void => {
        this.logged$.next(logs);
      });
    });
  }

  logMessage(log: NwLogMessage): void {
    this.handleLogsInBatch.next(log);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
