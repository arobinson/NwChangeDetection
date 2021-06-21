import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NwDefaultComponent } from './nw-default.component';

describe('NwComponentComponent', () => {
  let component: NwDefaultComponent;
  let fixture: ComponentFixture<NwDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NwDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
