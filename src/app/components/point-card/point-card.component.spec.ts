import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCardComponent } from './point-card.component';

describe('PointCardComponent', () => {
  let component: PointCardComponent;
  let fixture: ComponentFixture<PointCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
