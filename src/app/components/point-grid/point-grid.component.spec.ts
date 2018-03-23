import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointGridComponent } from './point-grid.component';

describe('PointGridComponent', () => {
  let component: PointGridComponent;
  let fixture: ComponentFixture<PointGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
