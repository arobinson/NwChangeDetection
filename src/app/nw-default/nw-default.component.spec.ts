import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NwDefaultComponent } from './nw-default.component';

describe('NwComponentComponent', () => {
  let component: NwDefaultComponent;
  let fixture: ComponentFixture<NwDefaultComponent>;

  beforeEach(async(() => {
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
