import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleProductComponent } from './sale-product.component';

describe('SaleProductComponent', () => {
  let component: SaleProductComponent;
  let fixture: ComponentFixture<SaleProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
