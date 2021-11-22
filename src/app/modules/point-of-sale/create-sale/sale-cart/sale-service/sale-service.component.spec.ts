import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleServiceComponent } from './sale-service.component';

describe('SaleServiceComponent', () => {
  let component: SaleServiceComponent;
  let fixture: ComponentFixture<SaleServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
