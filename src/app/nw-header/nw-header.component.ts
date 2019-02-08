import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nw-header',
  templateUrl: './nw-header.component.html',
  styleUrls: ['./nw-header.component.css']
})
export class NwHeaderComponent implements OnInit {
  @Input() changeDetectionCount: number;

  constructor() { }

  ngOnInit() {
  }

}
