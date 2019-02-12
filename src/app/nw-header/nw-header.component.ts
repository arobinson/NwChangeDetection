import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NwLogMessage, NwLogType } from '../nw-model';
import { NwLoggerService } from '../services/nw-logger.service';
import { NwStatisticsService } from '../services/nw-statistics.service';

@Component({
  selector: 'app-nw-header',
  templateUrl: './nw-header.component.html',
  styleUrls: ['./nw-header.component.css']
})
export class NwHeaderComponent implements OnInit, OnDestroy {
  @Input() clickCount: number = 0;
  @Output() readonly clickCountChange = new EventEmitter<number>();

  constructor(
    public stats: NwStatisticsService,
    private logService: NwLoggerService) {
  }

  onButtonClick() {
    this.clickCount++;
    this.clickCountChange.emit(this.clickCount);
    this.logService.logMessage(
      new NwLogMessage(
        NwLogType.LifecycleEvent,
        1,
        `NwHeaderComponent global button clicked: ${this.clickCount}`
      )
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
  }

  triggerTick(): void {
    // No code necessary, by using (click), Angular will run the NgZone.
    // Without the event handler, using an ApplicationRef or NgZone can also trigger the tick
  }
}
