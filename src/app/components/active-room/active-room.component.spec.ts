import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRoomComponent } from './active-room.component';

describe('ActiveRoomComponent', () => {
  let component: ActiveRoomComponent;
  let fixture: ComponentFixture<ActiveRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
