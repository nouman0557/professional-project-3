/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarRaitingComponent } from './star-raiting.component';

describe('StarRaitingComponent', () => {
  let component: StarRaitingComponent;
  let fixture: ComponentFixture<StarRaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarRaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
