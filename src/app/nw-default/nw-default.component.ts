import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NwComponentStructure, NwComponentType } from '../nw-model';
import { NwBaseComponent } from '../nw-base/nw-base.component';

@Component({
  selector: 'app-nw-default',
  templateUrl: '../nw-base/nw-base.component.html',
  styleUrls: ['../nw-base/nw-base.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NwDefaultComponent extends NwBaseComponent {
  constructor() {
    super();
  }
}
