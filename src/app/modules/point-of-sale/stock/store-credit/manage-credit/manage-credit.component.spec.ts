import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCreditComponent } from './manage-credit.component';

describe('ManageCreditComponent', () => {
  let component: ManageCreditComponent;
  let fixture: ComponentFixture<ManageCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
