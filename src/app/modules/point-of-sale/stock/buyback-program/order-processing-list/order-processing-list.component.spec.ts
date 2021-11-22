import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessingListComponent } from './order-processing-list.component';

describe('OrderProcessingListComponent', () => {
  let component: OrderProcessingListComponent;
  let fixture: ComponentFixture<OrderProcessingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProcessingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
