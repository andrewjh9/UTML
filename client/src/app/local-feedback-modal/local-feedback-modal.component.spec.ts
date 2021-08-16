import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFeedbackModalComponent } from './local-feedback-modal.component';

describe('LocalFeedbackModalComponent', () => {
  let component: LocalFeedbackModalComponent;
  let fixture: ComponentFixture<LocalFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalFeedbackModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
