import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAccordionComponent } from './cart-accordion.component';

describe('CartAccordionComponent', () => {
  let component: CartAccordionComponent;
  let fixture: ComponentFixture<CartAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
