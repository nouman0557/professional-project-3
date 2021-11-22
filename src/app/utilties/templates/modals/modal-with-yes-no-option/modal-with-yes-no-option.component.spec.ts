import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWithYesNoOptionComponent } from './modal-with-yes-no-option.component';

describe('ModalWithYesNoOptionComponent', () => {
  let component: ModalWithYesNoOptionComponent;
  let fixture: ComponentFixture<ModalWithYesNoOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWithYesNoOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWithYesNoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
