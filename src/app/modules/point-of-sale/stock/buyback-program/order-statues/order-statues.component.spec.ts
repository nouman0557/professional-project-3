import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatuesComponent } from './order-statues.component';

describe('OrderStatuesComponent', () => {
  let component: OrderStatuesComponent;
  let fixture: ComponentFixture<OrderStatuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStatuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
