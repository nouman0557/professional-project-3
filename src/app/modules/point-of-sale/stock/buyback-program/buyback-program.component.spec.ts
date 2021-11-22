import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackProgramComponent } from './buyback-program.component';

describe('BuybackProgramComponent', () => {
  let component: BuybackProgramComponent;
  let fixture: ComponentFixture<BuybackProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
