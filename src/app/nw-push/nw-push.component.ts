import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { NwBaseComponent } from '../nw-base/nw-base.component';
import { NwLoggerService } from '../services/nw-logger.service';
import { NwStatisticsService } from '../services/nw-statistics.service';

@Component({
  selector: 'app-nw-push',
  templateUrl: '../nw-base/nw-base.component.html',
  styleUrls: ['../nw-base/nw-base.component.css'],
  host: {
    class: 'nw-component nw-push'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NwPushComponent extends NwBaseComponent {
  constructor(
    cd: ChangeDetectorRef,
    zone: NgZone,
    stats: NwStatisticsService,
    logService: NwLoggerService) {
    super(stats, cd, zone, logService);
  }
}
