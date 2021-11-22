import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketsComponent } from './customer-tickets.component';

describe('CustomerTicketsComponent', () => {
  let component: CustomerTicketsComponent;
  let fixture: ComponentFixture<CustomerTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
