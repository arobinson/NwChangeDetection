import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NwMouseComponent } from './nw-mouse.component';

describe('NwMouseComponent', () => {
  let component: NwMouseComponent;
  let fixture: ComponentFixture<NwMouseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NwMouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwMouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
