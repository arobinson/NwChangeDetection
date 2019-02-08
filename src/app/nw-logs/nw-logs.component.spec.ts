import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NwLogsComponent } from './nw-logs.component';

describe('NwLogsComponent', () => {
  let component: NwLogsComponent;
  let fixture: ComponentFixture<NwLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NwLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
