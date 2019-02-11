import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { NwBaseComponent } from '../nw-base/nw-base.component';
import { NwLoggerService } from '../services/nw-logger.service';
import { NwStatisticsService } from '../services/nw-statistics.service';

@Component({
  selector: 'app-nw-default',
  templateUrl: '../nw-base/nw-base.component.html',
  styleUrls: ['../nw-base/nw-base.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'nw-component nw-default'
  }
})
export class NwDefaultComponent extends NwBaseComponent {
  constructor(
    stats: NwStatisticsService,
    cd: ChangeDetectorRef,
    er: ElementRef,
    zone: NgZone,
    logService: NwLoggerService) {
    super(stats, cd, er, zone, logService);
  }
}
