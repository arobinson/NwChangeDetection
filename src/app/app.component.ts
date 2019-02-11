import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { NwComponentStructure, NwComponentType } from './nw-model';
import { NwStatisticsService } from './services/nw-statistics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  componentStructure: NwComponentStructure;
  title = 'nw-change-detection';
  NwComponentType = NwComponentType;
  globalClickCount = 0;

  constructor(private stats: NwStatisticsService) {
  }

  ngOnInit(): void {
    const sharedData = {};
    this.componentStructure = {
      name: 'root',
      componentCreationCount: 0,
      componentType: NwComponentType.Default,
      inputData: sharedData,
      children: [
        {
          name: 'A',
          componentType: NwComponentType.Default,
          componentCreationCount: 0,
          inputData: sharedData,
          children: [
            {
              name: '1',
              componentType: NwComponentType.Default,
              componentCreationCount: 0,
              inputData: sharedData,
            },
            {
              name: '2',
              componentType: NwComponentType.Default,
              inputData: sharedData,
              componentCreationCount: 0,
            }
          ]
        },
        {
          name: 'B',
          componentType: NwComponentType.OnPush,
          inputData: sharedData,
          componentCreationCount: 0,
          children: [
            {
              name: '1',
              componentType: NwComponentType.OnPush,
              inputData: sharedData,
              componentCreationCount: 0,
            },
            {
              name: '2',
              componentType: NwComponentType.OnPush,
              inputData: sharedData,
              componentCreationCount: 0,
            }
          ]
        }
      ]
    };
  }

  ngAfterContentChecked(): void {
    this.stats.incrementTotalCount();
  }
}
