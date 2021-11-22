import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleProcductWithMultipleSupplierComponent } from './sale-procduct-with-multiple-supplier.component';

describe('SaleProcductWithMultipleSupplierComponent', () => {
  let component: SaleProcductWithMultipleSupplierComponent;
  let fixture: ComponentFixture<SaleProcductWithMultipleSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleProcductWithMultipleSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleProcductWithMultipleSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
