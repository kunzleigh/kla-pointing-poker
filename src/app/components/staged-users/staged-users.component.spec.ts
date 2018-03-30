import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagedUsersComponent } from './staged-users.component';

describe('StagedUsersComponent', () => {
  let component: StagedUsersComponent;
  let fixture: ComponentFixture<StagedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
