import { Component, OnDestroy, OnInit } from '@angular/core';
import { NwStatisticsService } from '../services/nw-statistics.service';

@Component({
  selector: 'app-nw-header',
  templateUrl: './nw-header.component.html',
  styleUrls: ['./nw-header.component.css']
})
export class NwHeaderComponent implements OnInit, OnDestroy {
  constructor(public stats: NwStatisticsService) {
  }

  ngOnInit() {}

  ngOnDestroy(): void {
  }
}
