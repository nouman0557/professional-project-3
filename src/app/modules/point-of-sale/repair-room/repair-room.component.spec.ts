import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairRoomComponent } from './repair-room.component';

describe('RepairRoomComponent', () => {
  let component: RepairRoomComponent;
  let fixture: ComponentFixture<RepairRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
