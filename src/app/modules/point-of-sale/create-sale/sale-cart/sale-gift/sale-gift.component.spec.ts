import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleGiftComponent } from './sale-gift.component';

describe('SaleGiftComponent', () => {
  let component: SaleGiftComponent;
  let fixture: ComponentFixture<SaleGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
