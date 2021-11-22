import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDeviceProductComponent } from './sale-device-product.component';

describe('SaleDeviceProductComponent', () => {
  let component: SaleDeviceProductComponent;
  let fixture: ComponentFixture<SaleDeviceProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDeviceProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDeviceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
