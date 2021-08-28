import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFeedbackModalComponent } from './external-feedback-modal.component';

describe('ExternalFeedbackModalComponent', () => {
  let component: ExternalFeedbackModalComponent;
  let fixture: ComponentFixture<ExternalFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalFeedbackModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
