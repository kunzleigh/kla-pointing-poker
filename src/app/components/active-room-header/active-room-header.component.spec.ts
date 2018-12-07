import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRoomHeaderComponent } from './active-room-header.component';

describe('ActiveRoomHeaderComponent', () => {
  let component: ActiveRoomHeaderComponent;
  let fixture: ComponentFixture<ActiveRoomHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRoomHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRoomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
