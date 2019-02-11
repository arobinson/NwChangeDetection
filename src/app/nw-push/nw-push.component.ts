import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
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
    stats: NwStatisticsService,
    cd: ChangeDetectorRef,
    er: ElementRef,
    zone: NgZone,
    logService: NwLoggerService) {
    super(stats, cd, er, zone, logService);
  }

  onNeedsUpdate(): void {
    if (!this.detached) {
      this.cd.markForCheck();
    }
  }
}
