import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NwBaseComponent } from './nw-base.component';

describe('NwBaseComponent', () => {
  let component: NwBaseComponent;
  let fixture: ComponentFixture<NwBaseComponent>;

  beforeEach(async(() => {
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
