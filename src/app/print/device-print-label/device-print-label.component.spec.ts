import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePrintLabelComponent } from './device-print-label.component';

describe('DevicePrintLabelComponent', () => {
  let component: DevicePrintLabelComponent;
  let fixture: ComponentFixture<DevicePrintLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePrintLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePrintLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
