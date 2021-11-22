import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerDeviceComponent } from './add-customer-device.component';

describe('AddCustomerDeviceComponent', () => {
  let component: AddCustomerDeviceComponent;
  let fixture: ComponentFixture<AddCustomerDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
