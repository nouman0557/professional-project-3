import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCommentComponent } from './device-comment.component';

describe('DeviceCommentComponent', () => {
  let component: DeviceCommentComponent;
  let fixture: ComponentFixture<DeviceCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
