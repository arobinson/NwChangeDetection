import { Component, Input, OnInit } from '@angular/core';
import { NwComponentStructure, NwComponentType } from './nw-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  componentStructure: NwComponentStructure;
  title = 'nw-change-detection';
  changeDetectionCount: number = 0;
  NwComponentType = NwComponentType;

  ngOnInit(): void {
    const sharedData = {};
    this.componentStructure = {
      name: 'root',
      componentType: NwComponentType.Default,
      inputData: sharedData,
      children: [
        {
          name: 'A',
          componentType: NwComponentType.Default,
          inputData: sharedData,
          children: [
            {
              name: '1',
              componentType: NwComponentType.Default,
              inputData: sharedData,
              children: [
                {
                  name: 'a',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                },
                {
                  name: 'b',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                },
                {
                  name: 'c',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                }
              ]
            },
            {
              name: '2',
              componentType: NwComponentType.Default,
              inputData: sharedData,
              children: [
                {
                  name: 'a',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                },
                {
                  name: 'b',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                },
                {
                  name: 'c',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                }
              ]
            }
          ]
        },
        {
          name: 'B',
          componentType: NwComponentType.OnPush,
          inputData: sharedData,
          children: [
            {
              name: '1',
              componentType: NwComponentType.OnPush,
              inputData: sharedData,
              children: [
                {
                  name: 'a',
                  componentType: NwComponentType.OnPush,
                  inputData: sharedData,
                },
                {
                  name: 'b',
                  componentType: NwComponentType.OnPush,
                  inputData: sharedData,
                },
                {
                  name: 'c',
                  componentType: NwComponentType.OnPush,
                  inputData: sharedData,
                }
              ]
            },
            {
              name: '2',
              componentType: NwComponentType.Default,
              inputData: sharedData,
              children: [
                {
                  name: 'a',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                },
                {
                  name: 'b',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                },
                {
                  name: 'c',
                  componentType: NwComponentType.Default,
                  inputData: sharedData,
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
