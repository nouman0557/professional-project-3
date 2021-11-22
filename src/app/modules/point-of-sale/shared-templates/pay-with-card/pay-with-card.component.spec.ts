import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayWithCardComponent } from './pay-with-card.component';

describe('PayWithCardComponent', () => {
  let component: PayWithCardComponent;
  let fixture: ComponentFixture<PayWithCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayWithCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayWithCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
