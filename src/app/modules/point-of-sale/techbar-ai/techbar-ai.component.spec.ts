import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechbarAiComponent } from './techbar-ai.component';

describe('TechbarAiComponent', () => {
  let component: TechbarAiComponent;
  let fixture: ComponentFixture<TechbarAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechbarAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechbarAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
