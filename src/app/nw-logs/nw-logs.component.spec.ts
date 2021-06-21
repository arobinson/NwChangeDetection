import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NwLogsComponent } from './nw-logs.component';

describe('NwLogsComponent', () => {
  let component: NwLogsComponent;
  let fixture: ComponentFixture<NwLogsComponent>;

  beforeEach(waitForAsync(() => {
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
