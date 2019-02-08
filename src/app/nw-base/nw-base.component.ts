import { Component, OnInit, Input } from '@angular/core';
import { NwComponentStructure, NwComponentType } from '../nw-model';

export class NwBaseComponent implements OnInit {
  @Input() componentStructure: NwComponentStructure;
  @Input() depth: number;
  name: string;
  NwComponentType = NwComponentType;

  constructor() { }

  ngOnInit() {
    this.name = this.componentStructure.name;
  }

  childToString(child: any): string {
    return typeof child + '/' + Object.keys(child).join(',');
  }
}
