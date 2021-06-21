import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NwBaseComponent } from './nw-base.component';

describe('NwBaseComponent', () => {
  let component: NwBaseComponent;
  let fixture: ComponentFixture<NwBaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NwBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
