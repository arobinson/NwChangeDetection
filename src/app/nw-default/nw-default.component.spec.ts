import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NwComponentComponent } from './nw-component.component';

describe('NwComponentComponent', () => {
  let component: NwComponentComponent;
  let fixture: ComponentFixture<NwComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NwComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
