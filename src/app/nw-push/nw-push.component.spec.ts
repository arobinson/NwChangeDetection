import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NwPushComponent } from './nw-push.component';

describe('NwPushComponent', () => {
  let component: NwPushComponent;
  let fixture: ComponentFixture<NwPushComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NwPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
