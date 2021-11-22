import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCheckinComponent } from './device-checkin.component';

describe('DeviceCheckinComponent', () => {
  let component: DeviceCheckinComponent;
  let fixture: ComponentFixture<DeviceCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
